const BlogPost = require('../models/BlogPost.js');
const UserPost = require('../models/UserPost');

module.exports = async (req, res, next) => {
  res.locals.dataUser = await UserPost.findById(req.query.id).populate({
    path: 'friends',
    select: ['avatar', 'username']
  })
  res.locals.articles = await BlogPost.find({ user_id: req.query.id }).populate({ path: "user_id" }).sort({ _id: -1 })
  next();
}
