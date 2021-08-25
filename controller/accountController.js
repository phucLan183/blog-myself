const UserPost = require('../models/UserPost');
const cloudinary = require('../utils/cloudinary');

const index = (req, res) => {
  res.render('account', {
    message: {}
  })
}

const changeAvatar = async (req, res) => {
  try {
    const avatar = req.file.path;
    const userId = req.query.id
    const uploadedAvatar = await cloudinary.uploader.upload(avatar, {
      folder: 'blog-myself/image-avatar'
    })
    const updateData = await UserPost.findByIdAndUpdate({
      _id: userId,
    }, {
      $set: {
        avatar: {
          public_id: uploadedAvatar.public_id,
          url: uploadedAvatar.url
        }
      }
    }, { new: true })
    if (uploadedAvatar && updateData)
      return res.render('account', {
        dataUser: updateData,
        message: {
          success: 'Change avatar successfully'
        }
      })
  } catch (error) {
    console.error(error);
  }
}

const changeBackground = async (req, res) => {
  try {
    const background = req.file.path;
    const userId = req.query.id
    const uploadedBackground = await cloudinary.uploader.upload(background, {
      folder: 'blog-myself/image-background'
    })
    const updateData = await UserPost.findByIdAndUpdate({
      _id: userId,
    }, {
      $set: {
        background: {
          public_id: uploadedBackground.public_id,
          url: uploadedBackground.url
        }
      }
    }, { new: true })
    if (uploadedBackground && updateData)
      return res.render('account', {
        dataUser: updateData,
        message: {
          success: 'Change background successfully'
        }
      })
  } catch (error) {
    console.error(error);
  }
}

const editProfile = async (req, res) => {
  try {
    const userId = req.query.id
    const { username } = req.body
    const updateProfile = await UserPost.findByIdAndUpdate({
      _id: userId,
    }, {
      $set: {
        username: username,
      }
    }, { new: true })
    res.render('account', {
      dataUser: updateProfile,
      message: {
        success: 'Update Profile Successfully'
      }
    })
  } catch (error) {
    console.error(error);
  }
}

const relationship = async (req, res) => {
  try {
    const friendId = req.query.id
    const userId = req.session.userId
    const follower = await UserPost.findByIdAndUpdate({
      _id: friendId,
    }, {
      $addToSet: {
        followers: userId,
      }
    }, { new: true }).populate({
      path: 'friends',
      select: ['avatar', 'username']
    })
    const friend = await UserPost.findByIdAndUpdate({
      _id: userId,
    }, {
      $addToSet: {
        friends: friendId
      }
    })
    res.render('account', {
      dataUser: follower,
      message: {
        success: 'Follower is successfully'
      }
    })
  } catch (error) {
    console.error(error);
  }
}

const divisions = async (req, res) => {
  try {
    const friendId = req.query.id
    const userId = req.session.userId
    const follower = await UserPost.findByIdAndUpdate({
      _id: friendId,
    }, {
      $pull: {
        followers: userId,
      }
    }, { new: true }).populate({
      path: 'friends',
      select: ['avatar', 'username']
    })
    const friend = await UserPost.findByIdAndUpdate({
      _id: userId,
    }, {
      $pull: {
        friends: friendId
      }
    })
    res.render('account', {
      dataUser: follower,
      message: {
        success: 'Unfollow is successfully'
      }
    })
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  index: index,
  editProfile: editProfile,
  changeAvatar: changeAvatar,
  changeBackground: changeBackground,
  relationship: relationship,
  divisions: divisions
}