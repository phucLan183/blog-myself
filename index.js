//Khai bao thu vien
require('dotenv').config();
const express = require('express');
const app = new express();
const fileUpload = require('express-fileupload');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');

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
// app.use(fileUpload())

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


const clientRoute = require('./router/client');
app.use(clientRoute)

//Tao server 
const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`App running in http://localhost:${port}`);
})