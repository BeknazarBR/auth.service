const bcrypt = require('bcrypt');

const salt = 5;

module.exports = {
    generateHash: (input) => {
        return bcrypt.hash(input, salt);
    },
    compareHash(password, hash) {
        return bcrypt.compare(password, hash);
    }
}
