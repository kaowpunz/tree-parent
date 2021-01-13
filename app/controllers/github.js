/**
 * @file app/controller/github.js
 * @param {json} response 
 */

const axios = require('axios');

const index = async (request, reply) => {
    let url = 'https://api.github.com/search/repositories?page=3&per_page=100&q=topic:nodejs';
    let response = await axios.get(url);
    return response;
}

module.exports = {
    index
}
