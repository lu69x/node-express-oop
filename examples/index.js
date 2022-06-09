
const db = require('../src/models/index');

async function syncDb() {
    db.sequelize.sync();
}


async function exec() {
    // Create
    // const res = await db.author.create({ name: 'Ton' })

    // Read
    // const res = await db.author.findAll({ where: { aid: 3 } })
    const res = await db.author.findAll({})

    // Update
    // const res = await db.author.update({ name: "Mhee" }, { where: { aid: 3 } })

    // // Delete
    // const res = await db.author.destroy({ where: { name: 'Mhee' } })

    console.log(res)
}


// syncDb()
exec()