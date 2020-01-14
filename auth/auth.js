const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { User } = require('../models/index.js')
// const bcrypt = require('bcrypt')

passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ where: { email: email }})
    console.log(user.email)
    console.log(`*** user: ${user} ***`)

    if (!user) {
      return done(null, false, { message: 'User not found'})
    }

    const validate = await bcrypt.compare(password, user.password);
    console.log(`*** validate: ${validate} ***`)

    if (!validate) {
      return done(null, false, { message: 'Wrong password'})
    }

    return done(null, user, { message: 'Logged in successfully'})

  } catch(error) {
    return done(error)
  }
}))

module.exports = {
  passport
}