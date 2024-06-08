const router = require('express').Router();

const fileRouter = require('../modules/file/router');
const authRouter = require('../modules/auth/router');

router.use('/auth', authRouter);
router.use('/file', fileRouter);

module.exports = router;
