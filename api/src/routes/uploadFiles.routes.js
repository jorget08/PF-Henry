const expressfileUpload = require('express-fileupload');
const { Router } = require('express');
// const { validarJwt } = require('../middlewares/validarJwt.js');
const router = Router();
const { UploadCloud } = require('../controllers/upload.controllers.js');

router.use(expressfileUpload({useTempFiles: true}));
//@ tipo: 'user', 'book', id: 'id del book, user'
router.put('/:tipo/:id', UploadCloud)

module.exports = router;