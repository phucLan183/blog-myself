const express = require('express');
const router = express.Router();
const pagesController = require('../controller/pagesController');
const authController = require('../controller/authController');
const upload = require('../utils/multer');
const authMiddleware = require('../middlerware/authMiddleware');
const accountController = require('../controller/accountController');

router.get('/', pagesController.home)
router.get('/blogs', pagesController.blog)
router.get('/contact', pagesController.contact)
router.get('/post?:id', pagesController.readPost)
router.get('/registration', authMiddleware.isUserLogin, authController.register)
router.get('/login', authMiddleware.isUserLogin, authController.login)

router.get('/post/edit?:id', authMiddleware.userNotLogin, pagesController.editPost)
router.get('/post/delete?:id', authMiddleware.userNotLogin, pagesController.deletePost)
router.get('/create', authMiddleware.userNotLogin, pagesController.newPost)
router.get('/logout', authMiddleware.userNotLogin, authController.logout)
router.get('/account?:id', authMiddleware.userNotLogin, accountController.index)
router.get('/account/follow?:id', authMiddleware.userNotLogin, accountController.relationship)
router.get('/account/unfollow?:id', authMiddleware.userNotLogin, accountController.divisions)

router.post('/register', authController.doRegister)
router.post('/login', authController.doLogin)
router.post('/contact', pagesController.sendContact)
router.post('/create', authMiddleware.userNotLogin, upload.single('image'), pagesController.addNewPost)
router.post('/post/edit?:id', authMiddleware.userNotLogin, upload.single('image'), pagesController.doEdit)
router.post('/account/setting/avatar?:id', authMiddleware.userNotLogin, upload.single('avatar'), accountController.changeAvatar)
router.post('/account/setting/background?:id', authMiddleware.userNotLogin, upload.single('background'), accountController.changeBackground)
router.post('/account/setting/profile?:id', authMiddleware.userNotLogin, accountController.editProfile)
router.post('/account/setting/password?:id', authMiddleware.userNotLogin, authController.changePassword)
module.exports = router