const bcrypt = require('bcryptjs');
const router = require('express').Router();
const { checkRegisterBody, checkUsernameFree, checkUsernameExists } = require('../middleware/middleware');
const { tokenBuilder } = require('./token-builder')
const User = require('../auth/users-model')

router.post('/register', checkRegisterBody, checkUsernameFree, (req, res, next) => {
  let user = req.body

  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, rounds);

  user.password = hash

  User.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(next);
});

router.post('/login', checkRegisterBody, checkUsernameExists, (req, res) => {
 if(bcrypt.compareSync(req.body.password, req.user.password)) {
   const token = tokenBuilder(req.user)
   res.json({
     message: `welcome, ${req.user.username}`,
     token 
   })
 }
 else {
   next({ status: 400, message: 'invalid credentitals' })
 }
});

module.exports = router;
