const router = require('express').Router();
//? middlewares
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar.campos.js');
const { validarJwt } = require('../middlewares/validarJwt.js');
const { validarAdminRole, validarAdminOmio } = require('../middlewares/validar.admin.js');
//? controllers
const { createUser, getUsers, updateUser, deleteUser, getUserId } = require('../controllers/user.controllers');

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
router.get('/:id', getUserId);
router.get('/', getUsers);

//? validar admin role o mi usuario
router.put('/:id', updateUser);
router.delete('/:id', [ validarJwt, validarAdminOmio ], deleteUser);

module.exports = router;