const configService = require('./config.service');

module.exports = {
    secretKey: configService.getString('JWT_SECRET'),
    accessExpiresIn: configService.getString('JWT_ACCESS_EXPIRES_IN'),
    refreshExpiresIn: configService.getString('JWT_REFRESH_EXPIRES_IN'),
};
