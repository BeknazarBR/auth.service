const userRepository = require('../../global/database/repositories/user.repository');
const sessionRepository = require('../../global/database/repositories/session.repository');
const ApiError = require('../../global/error/api.error');
const { generateHash, compareHash } = require('../../global/utils/hash.utils');
const { generateAccessToken, generateRefreshToken, verify } = require('../../global/token/service');
const { generateUnique } = require('../../global/utils/string.utils');

async function createSession({ userId }) {
    const identifier = generateUnique();

    await sessionRepository.create({
        identifier,
        userId,
    });

    return identifier;
}

async function generateTokens({ sessionIdentifier }) {

    const accessToken = generateAccessToken({
        sessionIdentifier,
    });
    const refreshToken = generateRefreshToken({
        sessionIdentifier,
    });

    return {
        accessToken,
        refreshToken,
    }
}

module.exports = {
    async signUp({ login, password }) {
        const existed = await userRepository.findOneByLogin(login);
        if (existed) {
            throw ApiError.badRequest('User already exists');
        }

        const hashPassword = await generateHash(password);
        await userRepository.create({
            login,
            password: hashPassword,
        });

        const user = await userRepository.findOneByLogin(login);
        const session = await createSession({
            userId: user.id,
        })

        const tokens = await generateTokens({
            sessionIdentifier: session,
        });

        return tokens;
    },
    async signIn({ login, password }) {
        const user = await userRepository.findOneByLogin(login);
        if (!user) {
            throw ApiError.badRequest('User not found');
        }

        const isPasswordMatch = await compareHash(password, user.password);

        if (!isPasswordMatch) {
            throw ApiError.badRequest('Invalid credentials');
        }

        const session = await createSession({
            userId: user.id,
        })

        const tokens = await generateTokens({
            sessionIdentifier: session,
        });

        return tokens;
    },
    async refreshTokens({ refreshToken }) {
        const tokenPayload = verify(refreshToken);

        const session = await sessionRepository.findOneByIdentifier(tokenPayload.sessionIdentifier);

        if (!session) {
            throw ApiError.unauthorized('Session not found');
        }

        return generateTokens({
            sessionIdentifier: session.identifier,
        });
    },
    async getInfo(id) {
        const user = await userRepository.findOneById(id);

        if (!user) {
            throw ApiError.internal('User not found');
        }

        return {
            id: user.login,
        };
    },
    async logout(sessionIdentifier) {
        const session = await sessionRepository.findOneByIdentifier(sessionIdentifier);

        if (session) {
            await sessionRepository.delete(session.id);
        }

        return 'ok'
    }
}
