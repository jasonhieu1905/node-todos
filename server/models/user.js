const moongose = require('mongoose');

var User = moongose.model('User', {
    'email': {
        type: String,
        required: true
    }
})

module.exports = { User }