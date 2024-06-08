const tokenService = require('../token/service');
const sessionRepository = require('../database/repositories/session.repository');
const ApiError = require('../error/api.error'); // Убедитесь, что путь правильный

module.exports = async function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(ApiError.unauthorized('Authorization header is missing'));
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return next(ApiError.unauthorized('Bearer token is missing'));
    }

    try {
        const payload = tokenService.verify(token);
        const session = await sessionRepository.findOneByIdentifier(payload.sessionIdentifier);

        if (!session) {
            return next(ApiError.unauthorized('Session not found'));
        }

        req.userSession = session;
        next();
    } catch (err) {
        return next(ApiError.unauthorized('Invalid token'));
    }
};
