/**
 * @file app/controller/tree.js
 * @param {json} request 
 * @param {json} reply 
 */

const index = (request, reply) => {
    return ('tree.controller.index');
}

const store = (request, reply) => {
    let data = request.payload
    let temp = []

    // prepare data
    for (let index in data) { 

        for(let key in data[index]){
            temp.push(data[index][key])
        }

    }

    // mapping array index
    let idMapping = temp.reduce((acc, el, i) => {

        acc[el.id] = i;
        return acc;
    }, []);

    let root;
    temp.forEach(el => {
    // Handle the root element
    if (el.parent_id === null) {
        root = el;
        return;
    }
    // Use our mapping to locate the parent element in our data array
    let parent = temp[idMapping[el.parent_id]];
    // Add our current el to its parent's `children` array
    parent.children = [...(parent.children || []), el];
    });
    
    return [root];
}

module.exports = {
    index,
    store
}
