const router = require('express').Router();
//? middlewares
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar.campos.js');
// const { validarJwt } = require('../middlewares/validarJwt.js');
// const { validarADMIN_ROLE } = require('../middlewares/validarAdminRole.js');

//? controllers
const { createUser } = require('../controllers/user.controllers');

router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('lastName', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio y debe ser valido').not().isEmpty().isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ], 
    createUser
);

module.exports = router;