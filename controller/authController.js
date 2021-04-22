const UserPost = require('../models/UserPost.js');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    repeat_pass: req.body.repeat_password,
  }
  const checkUser = await UserPost.findOne({
    username: user.username
  })

  try {
    if (checkUser) {
      res.render('register', {
        error: 'Tên đăng ký đã được sử dụng'
      })
    }
    const checkpass = user.password === user.repeat_pass
    if (!checkpass) {
      res.render('register', {
        error: 'Nhập sai mật khẩu'
      })
    }

    const dataUser = new UserPost({
      username: user.username,
      password: user.password
    })
    const saveData = await dataUser.save()
    res.render('register', {
      error: 'Đăng ký thành công'
    })
  } catch (error) {
    res.render('register', {
      error: error.message
    })
  }
}

const login = (req, res) => {
  const {
    username,
    password
  } = req.body;
  UserPost.findOne({
    username: username
  }, function (err, user) {
    if (user) {
      bcrypt.compare(password, user.password, function (err, same) {
        if (same) {
          req.session.userId = user._id
          res.redirect('/')
        } else {
          console.log(err);
          res.redirect('/auth/login')
        }
      })
    } else {
      res.redirect('/auth/login')
    }
  })
}

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
}

module.exports = {
  register: register,
  login: login,
  logout: logout,
}