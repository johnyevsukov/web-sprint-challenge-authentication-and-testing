const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/secrets')

const tokenBuilder = (user) => {
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(
    payload,
    JWT_SECRET,
    options,
  )
}

module.exports = {
    tokenBuilder
}