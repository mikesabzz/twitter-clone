module.exports = (db, Sequelize) => {
    return db.define('category', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        poster: Sequelize.STRING,
      },
      {
        freezeTableName: true // Model tableName will be the same as the model name
      }
    )
}