const router = require('express').Router();
//? middlewares
// const { check } = require('express-validator')
// const { validarCampos } = require('../middlewares/validar.campos.js');
const { validarJwt } = require('../middlewares/validarJwt.js');
const { sendEmail } = require('../controllers/email.controllers');

router.post('/',
    sendEmail
);

module.exports = router;
