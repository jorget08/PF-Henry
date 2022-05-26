const router = require('express').Router();
const { createRole } = require('../controllers/role.controllers');

router.post('/', createRole)

module.exports = router;