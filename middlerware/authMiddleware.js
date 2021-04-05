const User = require('../models/UserPost');
module.exports = (req, res, next ) => {
    User.findById(req.session.userId, (err, user) => {
        if (err || !user) return res.redirect('/')
        next()
    })
}