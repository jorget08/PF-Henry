const { Router } = require("express");
const { Book, Review, User } = require('../db')
const router = Router()
const { Op } = require('sequelize')


router.get('/allReviews', async (req, res, next) => {
    const { book, user } = req.query
    try {
        if (book) {
            const allReviews = await Review.findAll({
                where:
                {
                    bookId: book
                }
            })
            return res.status(200).json(allReviews)
        }
        if(user){
            const allReviews = await Review.findAll({
                where:
                {
                    userIdUser: user
                }
            })
            console.log('soy data user',allReviews)
            return res.status(200).json(allReviews)
        }
        else res.status(400).json({msg:'Need query params'})

    }catch (error) {
        next(error)
    }
})


router.post('/', async (req, res, next) => {
    try {
        const { review, book, user } = req.body;

        const createReview = await Review.create(review)
        const bookFound = await Book.findByPk(book)
        const userFound = await User.findByPk(user)

        await userFound.addReview(createReview)
        await bookFound.addReview(createReview)


        res.send(200)
    } catch (error) {
        next(error)
    }
})


module.exports = router