const {mongoose} = require('./../server/db/mongoose');

const {Todo} = require('./../server/models/todo');

var id = '5b12e3abb5575121d780376a';

Todo.findOne({
    _id: id
}, (err, res) => {
    console.log('founded', res);
})

Todo.findById(id).then(res => {
    if (!res) {
        return console.log('Not found');
    }
    console.log('doc', res);
})

