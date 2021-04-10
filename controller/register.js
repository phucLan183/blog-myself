const UserPost = require('../models/UserPost.js');
const bcrypt = require('bcrypt');
module.exports = async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    }
    const checkUser = await UserPost.findOne({ username: user.username})

    if (checkUser) {
        res.render('register', {
            error: 'Ten dang nhap da duoc su dung'
        })
    } else {
        const dataUser = new UserPost({
            username: user.username,
            password: user.password
        })
        const saveData = await dataUser.save()
        
        if (saveData) {
            res.render('register', {
                error: 'Dang ky thanh cong'
            })
        }
    }
}