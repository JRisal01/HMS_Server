const mongoose = require('mongoose');

const ContactMessageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    messages: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('ContactMessage', ContactMessageSchema);

