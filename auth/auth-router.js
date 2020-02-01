const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('./auth-model');
const generateToken = require('./token-mw');
const { validateUser } = require('./auth-helper');

router.post('/register', (req, res) => {
  const user = req.body;
  // always validate
  const validateRes = validateUser(user);
  // hash the password
  const hash = bcrypt.hashSync(user.password, 14);
  // override the plain text password with the hash
  user.password = hash;

  if(validateRes.isSuccessful === true){
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error.message);
      });
  } else {
    res.status(400).json({
      message: "Invalid information about the user. See errors for more details.",
      errors: validateRes.errors
    });
  }
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      // check that passwords match
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome back, ${user.username}!`, token });
      } else {
        // return 401 if the password or username are invalid
        res.status(401).json({ message: 'Invalid credentials!' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;