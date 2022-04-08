const mongoose = require('mongoose');

const GuestSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    roomType: {
        type: String,
        require: true
    },
    checkIn: {
        type: Date,
        require: true
    },
    checkOut: {
        type: Date,
        require: true
    }
});


module.exports = mongoose.model('Guests', GuestSchema);

