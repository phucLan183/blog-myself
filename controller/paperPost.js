const ContactPost = require("../models/ContactPost")

module.exports = function(req, res){
    ContactPost.create(req.body, function(err, contactpost){
        res.render('contact')
    })
}