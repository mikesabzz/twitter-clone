module.exports = (db, Sequelize) => {
    return db.define('image', {
        name: Sequelize.STRING,
        poster: Sequelize.STRING,
    },
    {
        freezeTableName: true
    })
} 