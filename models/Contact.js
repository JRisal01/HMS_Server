const mongoose = require('mongoose');

const GallerySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    galleryImage: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Gallery', GallerySchema);

