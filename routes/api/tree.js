const {index, store} = require('../../app/controllers/tree')

module.exports = [
    { 
        method: 'GET', 
        path: '/api/v1/tree',
        config : {
            handler: index
        }  
    },
    { 
        method: 'POST', 
        path: '/api/v1/tree',
        config : {
            handler: store
        }  
    }
];