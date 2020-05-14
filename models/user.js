module.exports = (db, Sequelize) => {
    return db.define('user', {
      name: Sequelize.STRING,
      email: JSON.stringify({
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      }),
      password: JSON.stringify({
        type: Sequelize.STRING,
        allowNull: false
      })
    })
  }