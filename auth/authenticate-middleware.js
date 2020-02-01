/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets.js')

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    jwt.verify(authorization, jwtSecret, function (error, decodedToken) {
      if (error) {
        res.status(401).json({ message: "Invalid Token" });
      } else {
        req.token = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'You shall not pass!!' });
  }
};
