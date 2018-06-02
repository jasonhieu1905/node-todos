const mongoose = require('mongoose');

var Todo =  mongoose.model('Todo',{
    'name': {
        type: String,
        trim: true,
    },
    'complete': {
        type: Boolean,
        default: false
    }, 
    'completeAt': {
        type: Number
    }
})

module.exports = { Todo }