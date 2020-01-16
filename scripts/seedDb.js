const { User }  = require('../models/index')

const seedDb = async () => {
  try {
    await User.destroy({
      where: {}
    })

    await User.create({
      name: "Demo User",
      email: "demouser@mail.com",
      password: "password"
    })

  } catch(e) {
    console.log(e);
  }
}

const run = async () => {
  try {
    await seedDb()
  } catch(e) {
    console.log(e)
  } finally {
    await process.exit()
  }
}

run()