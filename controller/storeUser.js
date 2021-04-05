const UserPost = require('../models/UserPost.js');
const bcrypt = require('bcrypt');
module.exports = function(req, res){
    UserPost.create(req.body, function(err, userpost){
        if(err){
            return res.redirect('/auth/register')
        }else {
            const { username, password } = req.body;
            UserPost.findOne({ username: username }, function(err, user) {
                if (user) {
                    bcrypt.compare( password, user.password, function(err, same){
                        if (same) {
                            req.session.userId = user._id
                            res.redirect('/')
                        }else {
                            res.redirect('/auth/login')
                        }
                    })
                }else {
                    res.redirect('/auth/login')
                }
            })
        }  
    })
}