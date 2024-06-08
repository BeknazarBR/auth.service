const fileService = require('./service');

module.exports = {
    async upload(req, res, next) {
        try {
            const file = req.files.file;
            const data = await fileService.upload(file);

            return res.status(200).send(data);
        } catch (e) {
            return next(e);
        }
    },
    async update(req, res, next) {
        try {
            const id = req.params.id;
            const file = req.files.file;
            const data = await fileService.update({
                id,
                file,
            });

            return res.status(200).send(data);
        } catch (e) {
            return next(e);
        }
    },
    async delete(req, res, next) {
        try {
            const id = req.params.id;
            const data = await fileService.delete(id);

            return res.status(200).send(data);
        } catch (e) {
            return next(e);
        }
    },
    async getInfo(req, res, next) {
        try {
            const id = req.params.id;
            const data = await fileService.getInfo(id);

            return res.status(200).send(data);
        } catch (e) {
            return next(e);
        }
    },
    async readFile(req, res, next) {
        try {
            const id = req.params.id;
            const stream = await fileService.readFile(id);

            res.status(200);

            return stream.pipe(res);
        } catch (e) {
            return next(e);
        }
    },
    async list(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const data = await fileService.list({
                page,
                limit,
            });

            return res.status(200).json(data)
        } catch (e) {
            return next(e);
        }
    }
}
