const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors=require('cors')
const bodyParser = require('body-parser');
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");


require('dotenv/config')
app.use(bodyParser.json());
app.use(cors());
app.use(express());
app.use( '/uploads', express.static('uploads'));
app.use( '/galleryUploads', express.static('galleryUploads'));



//Import Routes
const roomRouter = require('./routes/room');

app.use('/room', roomRouter)

const galleryRouter = require('./routes/gallery');
app.use('/gallery', galleryRouter)

const guestRouter = require('./routes/guest');
app.use('/guest', guestRouter)

const contactMessageRouter = require('./routes/contactMessage');
app.use('/contactMessage', contactMessageRouter)

const login = require('./routes/login');
app.use('/login', login)


app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


//connect To DB
mongoose.connect( process.env.DB_CONNECTION,
    { useNewUrlParser: true}, ()=>{
    console.log("connected");
})

//start lsitening to the server
app.listen(5000);




