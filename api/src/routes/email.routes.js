const router = require('express').Router();
//? middlewares
// const { check } = require('express-validator')
// const { validarCampos } = require('../middlewares/validar.campos.js');
const { validarJwt } = require('../middlewares/validarJwt.js');
const { sendEmail, sendEmailPassword } = require('../controllers/email.controllers');

router.post('/',
    sendEmail
);
router.post('/password', sendEmailPassword )

module.exports = router;
