const path = require('node:path');
const ApiError = require('../../global/error/api.error');
const { generateUnique } = require('../../global/utils/string.utils');
const storageService = require('../../global/storage/service');
const fileRepository = require('../../global/database/repositories/file.repository');
const { calcOffset } = require('../../global/utils/pagination.utils');

module.exports = {
    async upload(file) {
        if (!file) {
            throw ApiError.badRequest('No file uploaded');
        }

        const originalName = file.name;
        const ext = path.extname(originalName);
        const filename = generateUnique();

        await storageService.save(file.data, filename);

        await fileRepository.create({
            filename,
            originalName,
            ext,
            mimetype: file.mimetype,
            size: file.size,
        });

        const data = await fileRepository.findByName(filename);

        return data;
    },
    async update({ id, file }) {
        const existed = await fileRepository.findById(id);

        if (!existed) {
            throw ApiError.badRequest('File not found');
        }
        if (!file) {
            throw ApiError.badRequest('No file uploaded');
        }

        const originalName = file.name;
        const ext = path.extname(originalName);

        await storageService.save(file.data, existed.filename);

        await fileRepository.update({
            id,
            filename: existed.filename,
            originalName,
            ext,
            mimetype: file.mimetype,
            size: file.size,
        });

        const data = await fileRepository.findByName(existed.filename);

        return data;
    },
    async delete(id) {
        const existed = await fileRepository.findById(id);

        if (!existed) {
            throw ApiError.badRequest('File not found');
        }

        await storageService.delete(existed.filename);
        await fileRepository.delete(id);

        return id;
    },
    async getInfo(id) {
        const file = await fileRepository.findById(id);

        if (!file) {
            throw ApiError.notFound('File not found');
        }

        return file;
    },
    async readFile(id){
        const file = await fileRepository.findById(id);

        if (!file) {
            throw ApiError.notFound('File not found');
        }

        return storageService.get(file.filename);
    },
    async list({ page, limit }) {
        const offset = calcOffset({ page, limit });
        const items = await fileRepository.findMany({
            limit,
            offset,
        });
        const count = await fileRepository.totalCount();

        return {
            items,
            count,
        }
    }
}
