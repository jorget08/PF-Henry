const router = require('express').Router();
//? middlewares
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar.campos.js');
const { validarJwt } = require('../middlewares/validarJwt.js');
const { validarAdminRole, validarAdminOmio } = require('../middlewares/validar.admin.js');
//? controllers
const { createSupport, getSupports, updateSupport, deleteSupport, responseSupport, getSupportById } = require('../controllers/support.controllers');

router.post('/', 
    [
        check('comment', 'El comentario es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createSupport
);
router.put('/',
    [
        check('idSupport', 'El id del support es obligatorio').not().isEmpty(),
        check('response', 'La Respuesta es obligatoria').not().isEmpty(),
        validarCampos
    ],
    responseSupport
);
router.get('/',
   getSupports
);
router.put('/:id',
    [
        validarJwt,
        validarAdminOmio
    ],
    updateSupport
);
router.delete('/:id',
    [
        validarJwt,
        validarAdminOmio
    ],
    deleteSupport
);

module.exports = router;