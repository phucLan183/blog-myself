const mongoose = require('mongoose');
const Schema = mongoose.Schema
const BlogPostSchema = new Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    username: {
        type: String,
    },
    image: {
        public_id: {
            type: String,
        },
        url_img: {
            type: String,
        }
    }
},{
    timestamps: true,
});
const BlogPost = mongoose.model('BlogPost', BlogPostSchema)
module.exports = BlogPost