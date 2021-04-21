const BlogPost = require('../models/BlogPost.js');
const ContactPost = require('../models/ContactPost.js');
const UserPost = require('../models/UserPost');
const cloudinary = require('../utils/cloudinary');

const home = async (req, res) => {
    const dataPost = await BlogPost.find()
    if (dataPost) {
        res.render('index', {
            blogposts: dataPost
        });
    }
}

const about = (req, res) => {
    res.render('about')
}

const contact = (req, res) => {
    res.render('contact', {
        error: null
    })
}

const sendContact = async (req, res) => {
    const request = req.body

    try {
        const contact = new ContactPost({
            name: request.name,
            email: request.email,
            phone: request.phone,
            message: request.message
        })
        if (!contact) {
            return res.render('contact', {
                error: 'Khong duoc de chong'
            })
        }
        const saveData = await contact.save()
        console.log(saveData);
        return res.render('contact', {
            error: 'Gui thanh cong'
        })
    } catch (error) {
        res.render('contact', {
            error: error.message
        })
    }

}

const ReadPost = async (req, res) => {
    const idPost = req.params.id
    try {
        const findPost = await BlogPost.findById({
            _id: idPost
        })
        res.render('post', {
            detailPost: findPost
        })
    } catch (error) {
        res.send(error.message)
    }
}

const newPost = (req, res) => {
    if (req.session.userId) {
        return res.render('create', {
            error: null
        });
    }
    res.redirect('/login')
}

const addNewPost = async (req, res) => {
    const reqPost = {
        title: req.body.title,
        content: req.body.content,
        userId: req.session.userId,
        image: req.file.path,
    }
    const findUser = await UserPost.findOne({
        _id: reqPost.userId,
    })
    try {
        const uploadedImage = await cloudinary.uploader.upload(reqPost.image, {
            upload_preset: 'blog-myself'
        })
        const post = new BlogPost({
            title: reqPost.title,
            content: reqPost.content,
            username: findUser.username,
            image: {
                public_id: uploadedImage.public_id,
                url_img: uploadedImage.url
            },
        })
        const savePost = await post.save()
        if (uploadedImage && savePost) {
            res.render('create', {
                error: 'Đăng bài thành công'
            })
        }
    } catch (error) {
        return res.render('create', {
            error: error.message
        })
    }
}

const register = (req, res) => {
    res.render('register', {
        error: null,
    })
}

const login = (req, res) => {
    res.render('login')
}

module.exports = {
    home: home,
    about: about,
    contact: contact,
    newPost: newPost,
    login: login,
    register: register,
    sendContact: sendContact,
    addNewPost: addNewPost,
    ReadPost: ReadPost,
}