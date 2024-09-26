const db = require('../../data/dbConfig')

const findById = (id) => {
    return db('users').where('id', id).first()
}

function findBy(filter) {
    return db("users")
      .where(filter).first();
  }

const add = async (user) => {
    const [id] = await db('users').insert(user)
    return findById(id)
}

module.exports = {
    findById,
    add,
    findBy
}