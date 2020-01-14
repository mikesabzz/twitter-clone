const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const authRouter = require('./routers/authRouter')

const PORT = process.env.PORT || 4567

const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use('/auth', authRouter)

app.get('/', async (request, response) => {
  try {
    response.json({message: 'Welcome to Express Auth App!'})
  } catch (e) {
    response.status(e.status).json({ message: e.status })
  }
})

app.listen(PORT, () => console.log(`App is up and running listening on port ${PORT}`))