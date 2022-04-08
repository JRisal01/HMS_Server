const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
    roomImage: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    discription: {
        type: String,
        require: true
    },
    bedtype: {
        type: String,
        require: true
    },
    roomtype: {
        type: String,
        require: true
    },
    rate: {
        type: Number,
        require: true
    },
    noRoom: {
        type: Number,
        require: true
    },
    features: {
        type: Array,  
        require: true
    }
});


module.exports = mongoose.model('Rooms', RoomSchema);

