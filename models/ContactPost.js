const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ContactPostSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    message: String
});
const ContactPost = mongoose.model('ContactPost', ContactPostSchema)
module.exports = ContactPost