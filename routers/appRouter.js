const express = require('express')
const appRouter = express.Router()
const { passport } = require('../auth/auth')
const { Tweet, User, Profile, Image } = require('../models')
const upload = require('../multer')
const cloudinary = require('../cloudinary')
const fs = require('fs')
const multer = require('multer')
// const cloudinary = require('cloudinary').v2
// const dotenv = require('dotenv')
// dotenv.config()

// cloudinary.config({
//   cloud_name: process.env.Cloud_Name,
//   api_key: process.env.Cloudinary_API_KEY,
//   api_secret: process.env.Cloudinary_API_SECRET
// })

//upload image
// const storage = multer.diskStorage({
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '=' + file.originalname)
//   },
//   destination: function (req, file, cb) {
//     cb(null, `client/public/uploads/`)
//   }
// })
// const upload = multer({ storage: storage })

// uploads = (file, folder) => {
//   return new Promise(resolve => {
//     cloudinary.uploader.upload(file, (result) => {
//       resolve({
//         url: result.url,
//         id: result.public_id
//       })
//     }, {
//         resource_type: "auto",
//         folder:folder
//     })
//   })
// }
// appRouter.use('/upload-images', upload.array('image'), async (req, res) => {
//   const uploader = async (path) => await cloudinary.uploads(path)
//   if(req.method === 'POST') {
//     const urls = []
//     const files = req.files
//     for(const file of files) {
//       const { path } = file
//       const newPath = await uploader(path)
//       urls.push(newPath)
//       fs.unlinkSync(path)
//     }
//     res.status(200).json({
//       message: 'Images Upload Success',
//       data: urls
//     })
//   }else{
//     res.status(405).json({
//       err:"Images not uploaded"
//     })
//   }
// })

appRouter.get('/upload', async(req,res) => {
  try {
    await Image.findAll()
    .then((result) => res.json(result))
  } catch(error) {
    console.log(error)
  }
})

appRouter.post('/upload', upload.single('file'), async (req, res) => {
  try {
    await Image.create({
      poster: req.file.filename,
      userId: req.body.userId
    })
    .then(r => {
      res.send(r.get({ plain: true }))
    })
  }
  catch (error) {
    console.log(error)
  }
})

  

//get user profile
appRouter.get('/profile', passport.authenticate('jwt', { session: false}),
  async (req, res) => {
    res.json({ user: req.user, message: 'authenticated'})
  }
)
//Get all users
appRouter.get('/profile/users', async(req,res) => {
  try {
    const allUsers = await User.findAll()
    res.json(allUsers)
  } catch(error) {
    console.log(error)
  }
})
//Get one user
appRouter.get('/profile/:id', async(req,res)=> {
  try{
    const id = req.params.id
    const oneUser = await User.findByPk(id)
    res.json(oneUser)
  } catch(error){
    console.log(error)
  }
})
//Delete account
appRouter.delete('/profile/:id', async (req, res) => {
  try {
    const id = req.params.id
    const deleteUser = await User.findByPk(id)
    await deleteUser.destroy(req.body)
    res.json('Your account no longer exists')
  } catch(error) {
    console.log(error)
  }
})
//Get all tweets
appRouter.get('/tweets', async (req, res) => {
  try {
    const allTweets = await Tweet.findAll()
    res.json(allTweets)
  } catch(error) {
    console.log(error)
  }
})
//Create a new tweet
appRouter.post('/tweets', async (req, res) => {
  try {
    const newTweet = await Tweet.create(req.body)
    res.json(newTweet)
  } catch(error) {
    console.log(error)
  }
})
//Find one tweet
appRouter.get('/tweets/:id', async (req, res) => {
  try {
    const id = req.params.id
    const oneTweet = await Tweet.findByPk(id)
    res.json(oneTweet)
  } catch(error){
    console.log(error)
  }
})
//Edit a tweet
appRouter.put('/tweets/:id', async (req, res) => {
  try {
    const id = req.params.id
    const editTweet = await Tweet.findByPk(id)
    editTweet.update(req.body)
    res.json(editTweet)
  } catch(error) {
    console.log(error)
  }
})
//Delete a tweet
appRouter.delete('/tweets/:id', async (req, res) => {
  try {
    const id = req.params.id
    const deleteTweet = await Tweet.findByPk(id)
    await deleteTweet.destroy(req.body)
    res.json(deleteTweet)
  } catch(error) {
    console.log(error)
  }
})
//Get profiles
appRouter.get('/profile/bio/all', async (req, res) => {
  try {
    const profile = await Profile.findAll()
    res.json(profile)
  } catch(error) {
    console.log(error)
  }
})
//Get one profile 
appRouter.get('/profile/bio/:id', async (req, res) => {
  try {
    const oneProfile = await Profile.findByPk(req.params.id)
    res.json(oneProfile)
  } catch(error) {
    console.log(error)
  }
})
//Create a profile
appRouter.post('/profile/bio', async (req, res) => {
  try {
    const newProfile = await Profile.create(req.body)
    res.json(newProfile)
  } catch(error){
    console.log(error)
  }
})
//Edit a profile
appRouter.put('/profile/bio/:id', async (req, res) => {
  try {
    const id = req.params.id
    const editProfile = await Profile.findByPk(id)
    await editProfile.update(req.body)
    res.json(editProfile)
  } catch (error) {
    console.log(error)
  }
})
//Delete your profile
appRouter.delete('/profile/bio/:id', async (req, res) => {
  try {
    const id = req.params.id
    const deleteProfile = await Profile.findByPk(id)
    await deleteProfile.destroy(req.body)
    res.json('your profile no longer exists')
  } catch(error) {
    console.log(error)
  }
})

module.exports = (appRouter)
