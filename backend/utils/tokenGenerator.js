const jwt = require('jsonwebtoken');

const generateToken = (payload, secretKey, expiresIn) => {
  const token = jwt.sign(payload, secretKey, { expiresIn });
  return token;
};

module.exports ={generateToken};
