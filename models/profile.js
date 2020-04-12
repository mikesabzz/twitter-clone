module.exports = (db, Sequelize) => {
    return db.define('profile', {
        bio: Sequelize.STRING,
        photo: Sequelize.STRING,
        location: Sequelize.STRING,
        birthdate: Sequelize.STRING,
        website: Sequelize.STRING
    })
} 