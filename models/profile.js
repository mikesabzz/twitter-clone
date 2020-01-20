module.exports = (db, Sequelize) => {
    return db.define('profile', {
        bio: Sequelize.STRING,
        photo: {
            type: Sequelize.BLOB
        }
    })
} 