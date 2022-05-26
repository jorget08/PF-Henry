const { Router } = require('express');
const books=require('./books')
const categories=require('./categories')
const router = Router();

router.use('/books', books)
router.use('/categories', categories)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
