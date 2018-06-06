const mongoose = require('mongoose');

var Todo =  mongoose.model('Todo',{
    'text': {
        type: String,
        trim: true,
    },
    'complete': {
        type: Boolean,
        default: false
    }, 
    'completeAt': {
        type: Number
    },
    '_creator': {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

module.exports = { Todo }