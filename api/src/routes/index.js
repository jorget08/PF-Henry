const { Router } = require('express');
const books=require('./books')
const categories=require('./categories')
const userRouter = require('./user.routes');
const roleRouter = require('./role.routes');
const authRouter = require('./auth.routes');
const paypal = require('./paypal')
const router = Router();

router.use('/books', books)
router.use('/categories', categories)

// Configurar los routers
router.use('/user', userRouter);
router.use('/role', roleRouter);
router.use('/auth', authRouter);
router.use('/paypal', paypal)

module.exports = router;
