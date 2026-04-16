const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb+srv://satyam:satyam%4025@cluster0.ta2trb9.mongodb.net/tododatabase");

// Define schemas
const todocollection = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});

const todo = mongoose.model('tododatabase', todocollection);

module.exports = {
    todo
}
