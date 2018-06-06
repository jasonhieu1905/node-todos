const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');
const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {authenticate} = require('./middleware/authenticate');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, err => {
        console.log('err when saving object')
    })
    
})

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({todos})
    }, err => {
        res.sendStatus(400).send(err);
    })
})

app.get('/todos/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        res.status(401).send([]);
        return;
    }

    Todo.findById(req.params.id).then(todo => {
        if (!res) {
            res.status(404).send();
        }
        res.status(200).send({todo});
    })

});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    user.save().then((user) => {
        return user.generateAuthToken()
    }).then(token => {
        res.header('x-auth', token).send(user);
    }).catch(err => {
        res.status(400).send(err);
    })
})



app.get('/users/me', authenticate, (req, res) => {
   res.send(req.user);
})

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    User.findByCredential(body.email, body.password).then(user => {
        user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        })
    }).catch(err => {
        res.status(400).send();
    })
})

app.delete('/users/me/token', authenticate, (req,res) => {
    console.log('tokens', req.token)
    req.user.removeToken(req.token).then(user => {
        res.status(200).send();
    }).catch(err => {
        res.status(400).send();
    });
})

app.listen(port, () => {
    console.log(`App is listening ${port}`);
});

module.exports = {app};
