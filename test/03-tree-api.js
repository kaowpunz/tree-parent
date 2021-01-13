'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('../lib/server');

describe('Tree API /', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('GET responds with 200', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/api/v1/tree'
        });
        expect(res.statusCode).to.equal(200);
    });

    it('POST responds with 200', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/api/v1/tree'
        });
        expect(res.statusCode).to.equal(200);
    });

    it('POST responds with 404', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/api/v1/tree/1'
        });
        expect(res.statusCode).to.equal(404);
    });

    it('should return documentation array', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/api/v1/tree'
        });
        expect(res.result).to.be.array();
    });
});