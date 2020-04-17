const express = require('express')
const appRouter = express.Router()
const { passport } = require('../auth/auth')
const { Tweet, User, Profile } =require('../models')

//upload image
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.filename + '-' + Date.now() + '.jpg')
  }
})

const upload = multer({ storage: storage }).single('image')

appRouter.post('/profile', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      
    }
    res.json({
      success: true,
      message: 'Image uploaded'
    })
  })
})

//upload image



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



module.exports = appRouter