const BlogPost = require('../models/BlogPost.js');
const ContactPost = require('../models/ContactPost.js');
const UserPost = require('../models/UserPost');
const cloudinary = require('../utils/cloudinary');

const home = (req, res) => {
    res.render('index');
}

const blog = async (req, res) => {
    try {
        const dataPost = await BlogPost.find({
            status: true,
        }).populate({
            path: "user_id",
        }).sort({
            _id: -1
        })
        if (dataPost) {
            res.render('blog', {
                blogPosts: dataPost
            })
        }
    } catch (error) {
        console.error(error);
    }
}

const contact = (req, res) => {
    res.render('contact', {
        message: {}
    })
}

const sendContact = async (req, res) => {
    try {
        const request = req.body
        const contact = new ContactPost({
            name: request.name,
            email: request.email,
            phone: request.phone,
            message: request.message
        })
        if (contact) {
            return res.render('contact', {
                message: {
                    error: 'Không được để chống dữ liệu'
                }
            })
        }
        const saveData = await contact.save()
        res.render('contact', {
            message: {
                success: 'Bạn đã gửi thành công'
            }
        })
    } catch (error) {
        console.error(error);
    }

}

const readPost = async (req, res) => {
    try {
        const idPost = req.query.id
        const dataPost = await BlogPost.findById({
            _id: idPost
        }).populate({
            path: "user_id",
            select: "username",
        })
        res.render('post', {
            detailPost: dataPost
        })
    } catch (error) {
        console.error(error);
    }
}

const newPost = (req, res) => {
    return res.render('create', {
        message: {}
    });
}

const addNewPost = async (req, res) => {
    try {
        const reqPost = {
            title: req.body.title,
            content: req.body.content,
            status: req.body.status,
            userId: req.session.userId,
            image: req.file.path,
        }
        const uploadedImage = await cloudinary.uploader.upload(reqPost.image, {
            folder: 'blog-myself/image-background'
        })
        const post = new BlogPost({
            title: reqPost.title,
            content: reqPost.content,
            user_id: reqPost.userId,
            image: {
                public_id: uploadedImage.public_id,
                url_img: uploadedImage.url
            },
            status: reqPost.status,
        })
        const savePost = await post.save()
        if (uploadedImage && savePost) {
            res.render('create', {
                message: {
                    success: 'Đăng bài thành công'
                }
            })
        }
    } catch (error) {
        console.error(error);
    }
}

const editPost = async (req, res) => {
    try {
        const postId = req.query.id
        const dataPost = await BlogPost.findOne({
            _id: postId
        })
        res.render('edit', {
            message: {},
            dataPost
        })
    } catch (error) {
        console.error(error);
    }
}

const doEdit = async (req, res) => {
    try {
        const {
            title,
            status,
            content,
            image1
        } = req.body
        const postId = req.query.id
        if (!req.file) {
            const updatePost = await BlogPost.updateOne({
                _id: postId
            }, {
                $set: {
                    title: title,
                    content: content,
                    url_img: image1.url_img,
                    status: status
                }
            })
            return res.redirect(`/post/edit?id=${postId}`)
        }
        const deleteImageCloud = await cloudinary.uploader.destroy(image1.public_id)
        const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
            upload_preset: 'blog-myself'
        })
        const updatePost = await BlogPost.updateOne({
            _id: postId
        }, {
            $set: {
                title: title,
                content: content,
                image: {
                    public_id: uploadedImage.public_id,
                    url_img: uploadedImage.url
                },
                status: status,
            }
        })
        return res.redirect(`/post/edit?id=${postId}`)
    } catch (error) {
        console.error(error);
    }
}

const deletePost = async (req, res) => {
    try {
        const postId = req.query.id
        const deletePost = await BlogPost.findByIdAndDelete({
            _id: postId
        })
        const deleteImageCloud = await cloudinary.uploader.destroy(deletePost.image.public_id)
        if (deletePost && deleteImageCloud) {
            const userId = req.session.userId
            const dataUser = await UserPost.findById(userId).lean()
            const dataPost = await BlogPost.find({
                user_id: userId,
            }).populate({
                path: "user_id"
            }).sort({
                _id: -1
            })
            res.render('account', {
                articles: dataPost,
                dataUser: dataUser,
                message: {
                    success: 'Xóa bài viết thành công'
                }
            })
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    home: home,
    blog: blog,
    contact: contact,
    newPost: newPost,
    sendContact: sendContact,
    addNewPost: addNewPost,
    readPost: readPost,
    editPost: editPost,
    doEdit: doEdit,
    deletePost: deletePost,
}