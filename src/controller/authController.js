const UserPost = require('../models/UserPost.js');
const bcrypt = require('bcrypt');

const register = (req, res) => {
  res.render('register', {
    message: {
      error: null,
      success: null,
    }
  });
};

const doRegister = async (req, res) => {
  try {
    const { username, email, password, repeat_password } = req.body;
    const checkUser = await UserPost.findOne({
      email: email,
    });

    if (checkUser) {
      res.render('register', {
        message: {
          error: 'Email đã được sử dụng',
        }
      });
    }

    if (password === repeat_password) {
      const dataUser = new UserPost({
        username: username,
        email: email,
        password: password,
      });
      const saveData = await dataUser.save();
      req.session.userId = dataUser._id;
      return res.render('register', {
        message: {
          success: 'Đăng ký thành công',
        }
      });
    }

    res.render('register', {
      message: {
        error: 'Nhập sai mật khẩu',
      }
    });

  } catch (error) {
    console.error(error);
  }
};

const login = (req, res) => {
  res.render('login', {
    message: {
      error: null,
      success: null,
    }
  });
};

const doLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    const checkUser = await UserPost.findOne({
      email: email,
    })
    if (!checkUser) {
      return res.render('login', {
        message: {
          error: 'Tài khoản của bạn chưa được đăng ký'
        }
      })
    }

    const comparePassword = await bcrypt.compare(password, checkUser.password)
    if (!comparePassword) {
      return res.render('login', {
        message: {
          error: 'Vui lòng nhập lại mật khẩu'
        }
      })
    }
    req.session.userId = checkUser._id
    res.redirect('/blogs')
  } catch (error) {
    console.error(error);
  }
};

const logout = (req, res) => {
  delete req.session.userId
  res.redirect('/login')
};


const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body
    const userId = req.query.id
    const checkUser = await UserPost.findById(userId)
    const comparePassword = await bcrypt.compare(oldPassword, checkUser.password)
    if (!comparePassword || newPassword !== confirmPassword) {
      return res.render('account', {
        message: {
          error: 'Failed, password is incorrect!'
        }
      })
    }
    const hashPassword = await bcrypt.hash(confirmPassword, 8)
    const update = await UserPost.findByIdAndUpdate({
      _id: userId,
    }, {
      $set: {
        password: hashPassword,
      }
    }, { new: true })
    return res.render('account', {
      message: {
        success: 'Password was updated successfully!'
      }
    })
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  register: register,
  login: login,
  logout: logout,
  doLogin: doLogin,
  doRegister: doRegister,
  changePassword: changePassword,
};
