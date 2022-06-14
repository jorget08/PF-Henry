const { Router } = require("express");
const { Book, Review, User } = require('../db')
const router = Router()
const { Op } = require('sequelize')

router.get('/allReviews/admin', async (req, res, next) => {
    try {
        const allReviews = await Review.findAll({
            where:
            {
                report: {
                    [Op.ne]: null
                }
            }, include: [{ model: Book, attributes: ['id', 'title', 'image'] }
                , { model: User, attributes: ['idUser', 'name', 'lastName', 'email'] }]
        })
        return res.status(200).json(allReviews)
    } catch (error) {
        next(error)
    }
})
router.get('/allReviews', async (req, res, next) => {
    const { book, user, admin } = req.query
    try {
        if (book) {
            const allReviews = await Review.findAll({
                where:
                {
                    bookId: book
                }, include: { model: User }
            })
            return res.status(200).json(allReviews)
        }
        if (user) {
            const allReviews = await Review.findAll({
                where:
                {
                    userIdUser: user
                }
            })
            console.log('soy data user', allReviews)
            return res.status(200).json(allReviews)
        }

        else res.status(400).json({ msg: 'Need query params' })

    } catch (error) {
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

        const allReviews = await Review.findAll({
            where:
            {
                bookId: book
            }, include: { model: User }
        })
        return res.status(200).json(allReviews)


    } catch (error) {
        next(error)
    }
})
router.delete('/', async (req, res, next) => {
    const {  book, review } = req.query

    try {
       
        Review.destroy({where:{id:review}})
        const allReviews = await Review.findAll({
            where:
            {
                bookId: book,
                report: null
            }, include: { model: User }
        })
        return res.send(allReviews)


    } catch (error) {
        next(error)
    }
})
router.put('/', async (req, res, next) => {
    try {
        const { review, book } = req.query
        const { title, description } = req.body


        if (title) {
            await Review.update(
                {
                    title: title,
                },
                {
                    where: { id: review },
                }
            );
        }
        if (description) {
            await Review.update(
                {
                    description: description,
                },
                {
                    where: { id: review },
                }
            );
        }
        const allReviews = await Review.findAll({
            where:
            {
                bookId: book,
                report: null
            }, include: { model: User }
        })
        return res.send(allReviews)

        } catch (error) {
            next(error)
        }
    })
router.put('/report/:id', async (req, res, next) => {
    const { id } = req.params
    const { book } = req.query
    const { report } = req.body
    try {

        await Review.update(
            {
                report: report,
            },
            {
                where: { id: id },
            }
        );
        const allReviews = await Review.findAll({
            where:
            {
                bookId: book,
                report: null
            }, include: { model: User }
        })
        return res.status(200).json(allReviews)


    } catch (error) {
        next(error)
    }
})


module.exports = router