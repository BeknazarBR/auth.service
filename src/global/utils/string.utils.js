const { v4 } = require('uuid');

module.exports = {
    generateUnique() {
        return v4();
    }
}
