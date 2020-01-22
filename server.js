const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const authRouter = require('./routers/authRouter')
const passport = require('passport')
const appRouter = require('./routers/appRouter')
const { authorized } = require('./auth/auth')

const PORT = process.env.PORT || 4567

const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.use(passport.initialize())
app.use('/auth', authRouter)
app.use('/app', authorized, appRouter)

app.get('/', async (req, res) => {
  try {
    res.json({message: 'Welcome Mike to Express Auth App!'})
  } catch (e) {
    res.status(e.status).json({ message: e.status })
  }
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({ message: err.message })
})

app.listen(PORT, () => console.log(`App is up and running listening on port ${PORT}`))