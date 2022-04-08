
const express = require('express');
const router = express.Router();
const Room = require('../models/Room')


const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
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
      fileSize: 1024 * 1024 * 10
   },
    fileFilter: fileFilter
  })



//Get all the room
router.get('/', async (req, res) => {
    try{
        const room = await Room.find();
        res.json(room);
    }catch(err){
        res.json({message:err});
    }
});



//Get Spectfic Room
router.get('/:roomId', async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId);
        res.json(room);
        
     } catch (err) {
        res.json({ message: err });
    }
});


//Submit all the Rooms
router.post ('/', upload.single('roomImage'), async(req, res) => {
    console.log(req.file)
    const room = new Room({
        roomImage: req.file.path,
        name: req.body.name,
        discription: req.body.discription,
        bedtype: req.body.bedtype,
        roomtype: req.body.roomtype,
        rate:req.body.rate,
        noRoom: req.body.noRoom,
        features: req.body.features
    });
    try{
        const savedRoom = await room.save()
        res.json(savedRoom)
    }catch(err){
        res.json({ message: err });
    }
    
});

// //Submit all the Rooms
// router.post ('/', async(req, res) => {
//     const room = new Room({
//         name: req.body.name,
//         discription: req.body.discription,
//         bedtype: req.body.bedtype,
//         roomtype: req.body.roomtype,
//         rate: req.body.rate,
//         noRoom: req.body.noRoom,
//         features: req.body.features,
//     });
//     try{
//         const savedRoom = await room.save()
//         res.json(savedRoom)
//     }catch(err){
//         res.json({ message: err });
//     }
// });

//Delete Room
router.delete('/:roomId', async (req, res) => {
    try {
        const removedRoom = await Room.remove({ _id: req.params.roomId });
        res.json(removedRoom);
     } catch (err) {
        res.json({ message: err });
    }
});

//Update a post
router.patch('/:roomId', async (req, res) => {
    try {
        const updatedRoom = await Room.updateOne(
             { _id: req.params.roomId },
             { $set: { title: req.body.title } }
        );
        res.json(updatedRoom);
     } catch (err) {
          res.json({ message: err });
    }
});

module.exports = router;
