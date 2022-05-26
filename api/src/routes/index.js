const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const userRouter = require('./user.routes');
const roleRouter = require('./role.routes');
const authRouter = require('./auth.routes');

const router = Router();

// Configurar los routers
router.use('/user', userRouter);
router.use('/role', roleRouter);
router.use('/auth', authRouter);

module.exports = router;
