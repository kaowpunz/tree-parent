'use strict';
const Path = require('path');

const Handlebars = require('handlebars');
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
// const HapiSwagger = require('hapi-swagger');
const routes = require('./routes/api/index');
const { index } = require('./app/controllers/github')

const internals = {
  templatePath: '',
  thisYear: new Date().getFullYear()
};

internals.rootHandler = async function (request, h) {
  
  let data = await index()

  return h.view('index', {
      title: `Github Search API`,
      message: 'Github Search API',
      year: internals.thisYear,
      data : data
  });
};

internals.main = async function () {
  const server = Hapi.Server({ port: 3005 });
  await server.register(Vision);
  await server.register(require('hapi-pagination'))

  server.views({
      engines: { html: Handlebars },
      relativeTo: __dirname,
      path: `public/${internals.templatePath}`
  });

  server.route({ 
    method: 'GET', 
    path: '/',
    handler: internals.rootHandler,
    config: {
        plugins: {
            pagination: {
                enabled: false,
                defaults: {
                  page: 1,
                  limit: 10
                  // pagination: override if pagination is false or true by
                  // default
                }
            }
        }
    }
  });
  
  server.route(routes);
  await server.start();
  console.log('Server is running at ' + server.info.uri);
};

internals.main();
