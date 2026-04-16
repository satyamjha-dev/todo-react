const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("");

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
