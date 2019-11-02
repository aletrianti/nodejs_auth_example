const mongoose = require('mongoose');

// This schema is going to define the 'user' collection in the database
const User = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Export the schema so that it can be accessible through the User variable as a JavaScript model ('user')
module.exports = User = mongoose.model('user', User);
