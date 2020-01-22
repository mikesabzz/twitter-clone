const express = require('express')
const appRouter = express.Router()
const { passport } = require('../auth/auth')
const { Tweet, User } =require('../models')

appRouter.get('/profile', passport.authenticate('jwt', { session: false}),
  async (req, res) => {
    res.json({ user: req.user, message: 'authenticated'})
  }
)
//Get all tweets
appRouter.get('/tweets', async (req, res) => {
  try {
    const allTweets = await Tweet.findAll()
    console.log(allTweets)
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



module.exports = appRouter