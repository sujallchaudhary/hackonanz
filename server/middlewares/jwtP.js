const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const verifyToken = (req, res, next) => {
  const token = req.params.id;

  if (!token) {
    return res.status(403).send({ error: 'No token provided!' });
  }
  jwt.verify(token, process.env.JWT_P_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'Unauthorized!',message:err });
    }
    req.body._id = decoded._id;
    next();
  });
};
module.exports = verifyToken;