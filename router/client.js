const express = require('express');
const router = express.Router();
const pagesController = require('../controller/pagesController');
const authController = require('../controller/authController');
const upload = require('../utils/multer');
const authMiddleware = require('../middlerware/authMiddleware');

router.get('/', pagesController.home)
router.get('/about', pagesController.about)
router.get('/contact', pagesController.contact)
router.get('/post/:id', pagesController.ReadPost)
router.get('/create', authMiddleware,pagesController.newPost)
router.get('/register', pagesController.register)
router.get('/login', pagesController.login)
router.get('/logout', authController.logout)


router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/contact', pagesController.sendContact)
router.post('/create', authMiddleware, upload.single('image') ,pagesController.addNewPost)
module.exports = router