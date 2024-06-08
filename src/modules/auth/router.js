const router = require('express').Router();
const controller = require('./controller');
const authMiddleware = require('../../global/middlewares/auth.middleware');

router.post('/signup', controller.signUp);
router.post('/signin', controller.signIn);
router.post('/signin/new_token', controller.refreshTokens);
router.patch('/logout', authMiddleware, controller.logout);
router.get('/info', authMiddleware, controller.getInfo);

module.exports = router;
