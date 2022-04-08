const express = require('express');
const router = express.Router();
const Guest = require('../models/Guest')
const multer = require('multer')



//Get all the guest
router.get('/', async (req, res) => {
    try{
        const guest = await Guest.find();
        res.json(guest);
    }catch(err){
        res.json({message:err});
    }
});


//Get Spectfic Guest
router.get('/:guestId', async (req, res) => {
    try {
        const guest = await Guest.findById(req.params.guestId);
        res.json(guest);
     } catch (err) {
                    
        res.json({ message: err });
    }
});

//Submit all the Guests
router.post ('/', async(req, res) => {
    const guest = new Guest({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        roomType:req.body.roomType,
        status: req.body.status,
        checkIn:req.body.checkIn,
        checkOut: req.body.checkOut
    });
    try{
        const savedGuest = await guest.save()
        res.json(savedGuest)
        
    }catch(err){
        res.json({ message: err });
    }
    
});

//Delete Guest
router.delete('/:guestId', async (req, res) => {
    try {
        const removedGuest = await Guest.remove({ _id: req.params.guestId });
        res.json(removedGuest);
     } catch (err) {
        res.json({ message: err });
    }
});

//Update a post
router.patch('/:guestId', async (req, res) => {
    try {
        const updatedGuest = await Guest.updateOne(
             { _id: req.params.guestId },
             { $set: { title: req.body.title } }
        );
        res.json(updatedGuest);
     } catch (err) {
          res.json({ message: err });
    }
});

module.exports = router;
