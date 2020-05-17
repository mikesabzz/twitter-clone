const Sequelize = require('sequelize')
const UserModel = require('./user')
const TweetModel = require('./tweet')
const profileModel = require('./profile')
const bcrypt = require('bcrypt')
const imageModel = require('./image')

const db = new Sequelize((process.env.DATABASE_URL || 'postgres://localhost:5432/twitter_clone_db'),{
  database: 'twitter_clone_db',
  dialect: 'postgres',
  define: {
    underscored: true,
    returning: true
  }
})
if (process.env.NODE_ENV === 'production') {
  // If the node environment is production, connect to a remote PSQL database
  const db = new Sequelize(process.env.DATABASE_URL , {
    dialect: 'postgres'
  });
}
else {
  // Else connect to a local instance of PSQL running on your machine
  const db = new Sequelize({
    database: '', // Name of your local database
    dialect: 'postgres'
  });
}

const User = UserModel(db, Sequelize)

User.beforeCreate(async (user, options) => {
  const hashedPassword = await bcrypt.hash(user.password, 12)
  user.password = hashedPassword
})

const Image = imageModel(db, Sequelize)
User.hasOne(Image)
Image.belongsTo(User)
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
  Image
}
