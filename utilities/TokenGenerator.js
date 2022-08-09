const jwt = require('jsonwebtoken');
require('dotenv').config()

generateAccessToken = (email,role) => {
    const raw = JSON.stringify({email : email, role : role})
    return jwt.sign(raw, process.env.TOKEN_SECRET, { /*expiresIn: '1800s'*/ });
}

module.exports = generateAccessToken