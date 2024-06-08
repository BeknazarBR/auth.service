const service = require('./service')

module.exports = {
    async signUp(req, res, next) {
        try {
            const data = await service.signUp({
                login: req.body.login,
                password: req.body.password,
            });

            return res.status(200).json(data);
        } catch (e) {
            return next(e);
        }
    },
    async signIn(req, res, next) {
        try {
            const data = await service.signIn({
                login: req.body.login,
                password: req.body.password,
            });

            return res.status(200).json(data);
        } catch (e) {
            return next(e);
        }
    },
    async refreshTokens(req, res, next) {
        try {
            const data = await service.refreshTokens({
                refreshToken: req.body.refreshToken,
            });

            return res.status(200).json(data);
        } catch (e) {
            return next(e);
        }
    },
    async getInfo(req, res, next) {
        try {
            const userId = req.userSession.user_id;
            const data = await service.getInfo(userId);

            return res.status(200).json(data);
        } catch (e) {
            return next(e);
        }
    },
    async logout(req, res, next) {
        try {
            const sessionIdentifier = req.userSession.identifier;
            const data = await service.logout(sessionIdentifier);

            return res.status(200).json(data);
        } catch (e) {
            return next(e);
        }
    }
}
