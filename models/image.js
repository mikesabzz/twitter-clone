module.exports = (db, Sequelize) => {
    return db.define('image', {
        url: Sequelize.STRING
    },
    {
        freezeTableName: true
    })
} 