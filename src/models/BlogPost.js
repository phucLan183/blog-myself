const mongoose = require('mongoose');
const Schema = mongoose.Schema
const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    image: {
        public_id: {
            type: String,
        },
        url_img: {
            type: String,
        }
    },
    status: {
        type: Boolean,
        required: true,
    }
},{
    timestamps: true,
});
const BlogPost = mongoose.model('BlogPost', BlogPostSchema)
module.exports = BlogPost