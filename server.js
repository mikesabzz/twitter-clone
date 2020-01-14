const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const authRouter = require('./routers/authRouter')
const passport = require('passport')

const PORT = process.env.PORT || 4567

const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.use('/auth', authRouter)
app.use(passport.initialize())

app.get('/', async (req, res) => {
  try {
    res.json({message: 'Welcome to Express Auth App!'})
  } catch (e) {
    res.status(e.status).json({ message: e.status })
  }
})

app.listen(PORT, () => console.log(`App is up and running listening on port ${PORT}`))