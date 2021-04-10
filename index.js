//Khai bao thu vien
require('dotenv').config();
const express = require('express');
const app = new express();
const fileUpload = require('express-fileupload');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const authMiddleware = require('./middlerware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middlerware/redirectIfAuthenticatedMiddleware');

//Ket noi voi mongodb
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Database success');
});

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(fileUpload())

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
  }
}))

global.loggedIn = null;
app.use("*", function (req, res, next) {
  loggedIn = req.session.userId;
  next()
})

const validationMiddlerware = require('./middlerware/validationMiddlerware');
app.use('/posts/store', validationMiddlerware)

//Kiem soat trang chinh
const homeController = require('./controller/home');
app.get('/', homeController)

app.get('/about', function (req, res) {
  res.render('about');
})

app.get('/contact', function (req, res) {
  res.render('contact')
})

//Gui phan hoi contact
const paperPostController = require('./controller/paperPost');
app.post('/contact/paper', paperPostController)

//Nhung bai dang tren trang web
const getPostController = require('./controller/getPost');
app.get('/post/:id', getPostController)

const newPostController = require('./controller/newPost');
app.get('/posts/new', authMiddleware, newPostController)

const storePostController = require('./controller/storePost');
app.post('/posts/store', authMiddleware, storePostController)

//Phần này là tạo login và register
const newUserController = require('./controller/newUser');
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)

const registerUser = require('./controller/register');
app.post('/users/register', redirectIfAuthenticatedMiddleware, registerUser)

const loginPostController = require('./controller/loginPost');
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginPostController)

const loginUserController = require('./controller/loginUser');
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)

const logoutController = require('./controller/logoutUser');
app.get('/auth/logout', logoutController)

//Tao server 
const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("App is listening on port 5000");
})