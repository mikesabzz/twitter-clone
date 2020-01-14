const Sequelize = require('sequelize')
const UserModel = require('./user')

const db = new Sequelize({
  database: 'twitter_clone_db',
  dialect: 'postgres'
})

const User = UserModel(db, Sequelize)

module.exports = {
  db,
  User
}
