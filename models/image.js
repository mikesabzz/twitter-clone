module.exports = (db, Sequelize) => {
    return db.define('image', {
        poster: Sequelize.STRING
    },
    {
        freezeTableName: true
    })
} 