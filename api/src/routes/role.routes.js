const router = require('express').Router();
const { createRole, getRoles } = require('../controllers/role.controllers');

router.post('/', createRole)
router.get('/', getRoles)

module.exports = router;