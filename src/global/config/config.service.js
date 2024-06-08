require('dotenv').config()

module.exports = {
    getValue(variableName) {
        return process.env[variableName];
    },

    getString(variableName) {
        const value = this.getValue(variableName);

        if (!value) {
            throw new Error(`Missing parameter '${variableName}'`);
        }

        if (typeof value !== 'string') {
            throw new Error(`Parameter '${variableName}' must be a string`);
        }

        return value;
    },

    getNumber(variableName) {
        const value = Number(this.getValue(variableName));

        if (Number.isNaN(value)) {
            throw new Error(`Parameter '${variableName}' must be a number`);
        }

        return value;
    }
};
