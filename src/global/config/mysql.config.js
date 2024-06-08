const configService = require('./config.service');

module.exports = {
    host: configService.getString('MYSQL_HOST'),
    port: configService.getNumber('MYSQL_PORT'),
    database: configService.getString('MYSQL_DATABASE'),
    password: configService.getString('MYSQL_PASSWORD'),
    username: configService.getString('MYSQL_USERNAME'),
};
