const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage')



//Get all the contactMessage
router.get('/', async (req, res) => {
    try{
        const contactMessage = await ContactMessage.find();
        res.json(contactMessage);
    }catch(err){
        res.json({message:err});
    }
});



//Get Spectfic ContactMessage
router.get('/:contactMessageId', async (req, res) => {
    try {
        const contactMessage = await ContactMessage.findById(req.params.contactMessageId);
        res.json(contactMessage);
        
     } catch (err) {
        res.json({ message: err });
    }
});

//Submit all the ContactMessages
router.post ('/', async(req, res) => {
    const contactMessage = new ContactMessage({
        name: req.body.name,
        email: req.body.email,
        messages: req.body.messages,
        
    });
    try{
        const savedContactMessage = await contactMessage.save()
        res.json(savedContactMessage)
    }catch(err){
        res.json({ message: err });
    }
    
});

//Delete ContactMessage
router.delete('/:contactMessageId', async (req, res) => {
    try {
        const removedContactMessage = await ContactMessage.remove({ _id: req.params.contactMessageId });
        res.json(removedContactMessage);
     } catch (err) {
        res.json({ message: err });
    }
});

//Update a post
router.patch('/:contactMessageId', async (req, res) => {
    try {
        const updatedContactMessage = await ContactMessage.updateOne(
             { _id: req.params.contactMessageId },
             { $set: { title: req.body.title } }
        );
        res.json(updatedContactMessage);
     } catch (err) {
          res.json({ message: err });
    }
});

module.exports = router;
