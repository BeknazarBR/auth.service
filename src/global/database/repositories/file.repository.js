const FileModel = require('../models/file.model');

module.exports = {
    async create({ filename, originalName, mimetype, size, ext }) {
        await FileModel.create({
            filename,
            original_name: originalName,
            mimetype,
            size,
            ext,
            created_at: new Date().toISOString(),
        })
    },
    async update({ id, filename, originalName, mimetype, size, ext }) {
        await FileModel.update({
            filename,
            original_name: originalName,
            mimetype,
            size,
            ext,
        },{
            where: {
                id,
            }
        })
    },
    async findByName(filename) {
        const file = await FileModel.findOne({
            where: {
                filename,
            }
        });

        return file;
    },
    async findById(id) {
        const file = await FileModel.findOne({
            where: {
                id,
            }
        });

        return file;
    },
    async totalCount() {
        const count = await FileModel.count();

        return count;
    },
    async findMany({ limit, offset }) {
        const files = await FileModel.findAll({
            limit,
            offset,
        });

        return files;
    },
    async delete(id) {
        await FileModel.destroy({
            where: {
                id,
            },
        });
    }
};
