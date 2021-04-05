module.exports = function(req, res, next){
    if(req.files == null||req.body.title == null||req.body.title == null){
        return res.render('/post/new')
    }
    next()
}