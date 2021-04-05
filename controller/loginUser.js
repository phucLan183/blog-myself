const bcrypt = require('bcrypt');
const User = require('../models/UserPost');

module.exports = function(req, res) {
    const { username, password } = req.body;
    User.findOne({ username: username }, function(err, user) {
        if (user) {
            bcrypt.compare( password, user.password, function(err, same){
                if (same) {
                    req.session.userId = user._id
                    res.redirect('/')
                }else {
                    console.log(err);
                    res.redirect('/auth/login')
                }
            })
        }else {
            res.redirect('/auth/login')
        }
    })
}