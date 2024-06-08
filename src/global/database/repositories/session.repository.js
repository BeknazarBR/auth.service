const SessionModel = require("../models/session.model");

module.exports = {
    async create({ identifier, userId }) {
        await SessionModel.create({
            identifier,
            user_id: userId,
        });
    },
    async delete(id) {
        await SessionModel.destroy({
            where: {
                id,
            }
        });
    },
    async findOneByIdentifier(identifier) {
        const session = await SessionModel.findOne({
            where: {
                identifier,
            },
        });

        return session;
    }
};
