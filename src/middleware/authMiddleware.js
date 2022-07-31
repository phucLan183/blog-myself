const isUserLogin = (req, res, next) => {
    if (req.session.userId) {
        return res.redirect('/')
    }
    next()
}

const userNotLogin = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/login')
    }
    next()
}

module.exports = {
    isUserLogin: isUserLogin,
    userNotLogin: userNotLogin,
}