const UserModel = require('../models/user.model');

module.exports = {
    async findOneByLogin(login) {
        const user = await UserModel.findOne({
            where: {
                login,
            },
        });

        return user;
    },
    async findOneById(id) {
        const user = await UserModel.findOne({
            where: {
                id,
            },
        });

        return user;
    },
    async create(createUser) {
        await UserModel.create(createUser);
    }
};
