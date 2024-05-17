const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).send({ msg: 'No token, authorization denied' });
  }

  try {
    const verifyToken = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.userId = verifyToken.id;
    next();
  } catch (err) {
    res.status(401).send({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
