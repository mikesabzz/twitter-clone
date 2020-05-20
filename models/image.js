module.exports = (db, Sequelize) => {
    return db.define('image', {
        poster: Sequelize.STRING,
        url: Sequelize.STRING
    },
    {
        freezeTableName: true
    })
} 