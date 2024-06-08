const configService = require('./config.service');

module.exports = {
    port: configService.getNumber('PORT'),
};
