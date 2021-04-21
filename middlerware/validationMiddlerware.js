const postNew = (req, res, next) => {
    if(req.files == null || req.body.title == null || req.body.content == null){
        return res.render('create', {
            error: 'Không được để chống '
        })
    }
    next()
}

module.exports = {
    postNew: postNew,
}