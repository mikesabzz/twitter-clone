const express = require('express')
const appRouter = express.Router()
const { passport } = require('../auth/auth')
const { Tweet, User } =require('../models')

appRouter.get('/profile', passport.authenticate('jwt', { session: false}),
  async (req, res) => {
    res.json({ user: req.user, message: 'authenticated'})
  }
)
appRouter.get('/tweets', async (req, res) => {
  res.send( await Tweet.findAll() )
})

module.exports = appRouter