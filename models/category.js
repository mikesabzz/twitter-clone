module.exports = (db, Sequelize) => {
    return db.define('category', {
        image: Sequelize.STRING
      }
    )
}