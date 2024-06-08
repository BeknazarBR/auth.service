const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

module.exports = {
    generateAccessToken(input) {
        return jwt.sign(input, jwtConfig.secretKey, {
            expiresIn: jwtConfig.accessExpiresIn,
        })
    },
    generateRefreshToken(input) {
        return jwt.sign(input, jwtConfig.secretKey, {
            expiresIn: jwtConfig.refreshExpiresIn,
        })
    },
    verify(input) {
        return jwt.verify(input, jwtConfig.secretKey);
    }
}
