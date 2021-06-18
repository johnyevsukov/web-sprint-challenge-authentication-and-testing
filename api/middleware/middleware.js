const User = require('../auth/users-model')

const checkRegisterBody = (req, res, next) => {
    if(!req.body.username || !req.body.password) {
        next({ status: 400, message: 'username and password required' })
    }
    else {
        next()
    }
}

const checkUsernameFree = (req, res, next) => {
    User.findBy({ username: req.body.username })
    .then(user => {
        if(!user) {
            next()
        }
        else {
            next({status: 400, message: 'username taken'})
        }
    })
}

const checkUsernameExists = (req, res, next) => {
    User.findBy({ username: req.body.username })
    .then(user => {
        if(!user) {
            next({status: 400, message: 'invalid credentials'})
        }
        else {
            req.user = user
            next()
        }
    })
}

module.exports = {
    checkRegisterBody,
    checkUsernameFree,
    checkUsernameExists
}