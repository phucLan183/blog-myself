const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    avatar: {
        public_id: {
            type: String,
            default: 'blog-myself/image-avatar/osa6wu5fn6qzuojsmooa'
        },
        url: {
            type: String,
            default: 'http://res.cloudinary.com/tranphuclan183/image/upload/v1629283807/blog-myself/image-avatar/osa6wu5fn6qzuojsmooa.jpg'
        }
    },
    background: {
        public_id: {
            type: String,
            default: 'blog-myself/image-background/hwk2zokgtf7o6tc0qpft'
        },
        url: {
            type: String,
            default: 'http://res.cloudinary.com/tranphuclan183/image/upload/v1629285009/blog-myself/image-background/hwk2zokgtf7o6tc0qpft.jpg'
        }
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    followers: [],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {
    timestamps: true,
})

UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next();
})

const User = mongoose.model('User', UserSchema)
module.exports = User