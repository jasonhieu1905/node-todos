var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    console.log(req.body);
    var todo = new Todo({
        name: req.body.name
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, err => {
        console.log('err when saving object')
    })
    
})

app.listen('3000', () => {
    console.log('App is listening 3000');
});

module.exports = {app};
