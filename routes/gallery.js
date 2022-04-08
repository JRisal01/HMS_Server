const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery')
const multer = require('multer')

// localhost:3001/user/upload

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });

  const fileFilter = (req, file, cb) => { 
    // reject a file
     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
       cb(null, true);
      }
     else {
       cb(null, false);
     }
   };

   const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 50
   },
    fileFilter: fileFilter
  });



//Get all the Images
router.get('/', async (req, res) => {
    try{
        const gallery = await Gallery.find();
        res.json(gallery);
    }catch(err){
        res.json({message:err});
    }
});


//Get Spectfic Images
router.get('/:galleryId', async (req, res) => {
    try {
        const gallery = await Gallery.findById(req.params.galleryId);
        res.json(gallery);
     } catch (err) {
                    
        res.json({ message: err });
    }
});

//post Image
router.post ('/', upload.single('galleryImage'), async(req, res) => {
    const gallery = new Gallery({
        title: req.body.title,
        galleryImage: req.file.path
    });
    try{
        const savedGallery = await gallery.save()
        res.json(savedGallery)
    }catch(err){
        res.json({ message: err });
    }
    
});

//Delete Image
router.delete('/:galleryId', async (req, res) => {
    try {
        const removedGallery = await Gallery.remove({ _id: req.params.galleryId });
        res.json(removedGallery);
     } catch (err) {
        res.json({ message: err });
    }
});

//Update Image
router.patch('/:galleryId', async (req, res) => {
    try {
        const updatedGallery = await Gallery.updateOne(
             { _id: req.params.galleryId },
             { $set: { title: req.body.title } }
        );``
        res.json(updatedGallery);
     } catch (err) {
          res.json({ message: err });
    }
});

module.exports = router;
