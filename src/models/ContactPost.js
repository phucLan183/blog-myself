const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ContactPostSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    message: {
        type: String,
    }
}, {
    timestamps: true,
});
const ContactPost = mongoose.model('ContactPost', ContactPostSchema)
module.exports = ContactPost