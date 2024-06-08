const router = require('express').Router();
const controller = require('./controller');

router.post('/upload', controller.upload);
router.put('/update/:id', controller.update);
router.delete('/delete/:id', controller.delete);
router.get('/:id', controller.getInfo);
router.get('/download/:id', controller.readFile);
router.get('/list/paginated', controller.list);

module.exports = router;
