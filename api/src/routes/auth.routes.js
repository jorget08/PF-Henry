const router = require('express').Router();
//? middlewares
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar.campos.js');
const { validarJwt } = require('../middlewares/validarJwt.js');
//? controllers
const { login, renewToken, googleSignIn, confirmation, changePass, deleteAdress } = require('../controllers/auth.controllers');

router.post('/',
    [
        check('email', 'Email is required and must be valid').not().isEmpty().isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        validarCampos
    ], 
    login
)
router.get('/renew', validarJwt, renewToken);
router.post('/google', googleSignIn);
//? confirmation email
router.put('/confirmation/:id', confirmation);
router.put('/forgotPassword/:id', changePass);

router.delete('/adress/:id', deleteAdress);

module.exports = router;