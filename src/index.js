//Khai bao thu vien
require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.set('views', __dirname + '/../src/views');
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')

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

const validation = require('./utils/validation')
app.use('/register', validation.register)

const shareMiddleware = require('./middleware/shareMiddleware')
app.use(shareMiddleware)

const clientRoute = require('./router/client');
app.use(clientRoute)

//Tao server 
const port = process.env.PORT || 5000;
//Ket noi voi mongodb
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Database success');
  app.listen(port, function () {
    console.log(`App running in http://localhost:${port}`);
  })
});