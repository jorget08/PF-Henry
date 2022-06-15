const { Router } = require('express');
const books=require('./books')
const categories=require('./categories')
const userRouter = require('./user.routes');
const roleRouter = require('./role.routes');
const authRouter = require('./auth.routes');
const paypal = require('./paypal')
const reviews= require('./reviews')
const favourites= require('./favourites')
const email = require('./email.routes')
const support = require('./support.routes')
const uploadImg = require('./uploadFiles.routes')

const router = Router();

router.use('/books', books)
router.use('/categories', categories)

// Configurar los routers
router.use('/email', email)
router.use('/user', userRouter);
router.use('/role', roleRouter);
router.use('/auth', authRouter);
router.use('/paypal', paypal)
router.use('/favourites', favourites)
router.use('/reviews', reviews)
router.use('/support', support)
router.use('/upload', uploadImg)

module.exports = router;
