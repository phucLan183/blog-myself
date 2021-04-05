const BlogPost = require('../models/BlogPost.js');
module.exports = function(req, res){
    BlogPost.find({}, function(err, posts){
        
        res.render('index', {
            blogposts: posts
        });
    })
}