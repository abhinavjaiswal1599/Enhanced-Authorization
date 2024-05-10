// config/db.js
const mongoose = require('mongoose');
// require('dotenv').config(); 
// const mongoURI=process.env.MONGODB_URI;

mongoose.connect('mongodb+srv://jaisabhi1509:nbpYMLLbW8peWOGx@cluster0.7ueyzo1.mongodb.net/enhanced-authorization'
, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


