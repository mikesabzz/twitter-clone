const Sequelize = require('sequelize')
const UserModel = require('./user')
const TweetModel = require('./tweet')
const profileModel = require('./profile')
const bcrypt = require('bcrypt')
const CategoryModel = require('./category')

const db = new Sequelize({
  database: 'twitter_clone_db',
  dialect: 'postgres'
})

const User = UserModel(db, Sequelize)

User.beforeCreate(async (user, options) => {
  const hashedPassword = await bcrypt.hash(user.password, 12)
  user.password = hashedPassword
})
const Category = CategoryModel(db, Sequelize)
db.sync() 
  .then(() => {
    console.log(`Database & tables created!`)
});

const Tweet = TweetModel(db, Sequelize)
User.hasMany(Tweet)
Tweet.belongsTo(User)

const Profile = profileModel(db, Sequelize)
User.hasOne(Profile)
Profile.belongsTo(User)

module.exports = {
  db,
  User,
  Tweet,
  Profile,
  Category
}
