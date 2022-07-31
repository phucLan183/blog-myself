const register = (req, res, next) => {
  const { username, email, password } = req.body
  if (!username) {
    return res.render('register', {
      message: {
        error: 'Username is required'
      }
    })
  }
  if (!email) {
    return res.render('register', {
      message: {
        error: 'Email is required'
      }
    })
  }
  if (!password) {
    return res.render('register', {
      message: {
        error: 'Password is required'
      }
    })
  }
  next()
}

module.exports = {
  register: register,
}