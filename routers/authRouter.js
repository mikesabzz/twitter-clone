const express = require('express')
const authRouter = express.Router()
const { passport } = require('../auth/auth.js') 

//'/auth/login' route
authRouter.post('/login', (req, res, next) => {
  passport.authenticate('login', async(err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An Error Occurred')
        return next(error)
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error)
        return res.json({ user })
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
})

module.exports = authRouter