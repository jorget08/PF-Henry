const { Router } = require("express");
const { Book, Review, User } = require('../db')
const router = Router()
const { Op } = require('sequelize')

router.get('/allReviews/admin',async(req,res,next)=>{
    try {
        const allReviews = await Review.findAll({
            where:
            {
                report: {
                    [Op.ne]: null
                  }
            }, include:[{model:Book, attributes: ['id','title','image']}
            ,{model:User, attributes: ['idUser']}]
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
                },include:{model:User}
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
router.delete('/',async(req,res,next)=>{
    const {user,book,review}= req.query
    
    try {
        const bookFound = await Book.findByPk(book)
        const userFound= await User.findByPk(user)
        await userFound.removeReview(review)
        await bookFound.removeReview(review)
        res.send(200)
    } catch (error) {
        next(error)
    }
})
router.put('/',async(req,res,next)=>{
    try {
        const {review}= req.query
        const {title, description}=req.body


        if(title){
            Review.update(
                {
                  title: title,
                },
                {
                  where: { id: review },
                }
              );
        }
        if(description){
            Review.update(
                {
                    description: description,
                },
                {
                  where: { id: review },
                }
              );
        }
        return res.send('Updated!')

    } catch (error) {
        next(error)
    }
})
router.put('/report/:id',async(req,res,next)=>{
    const {id}=req.params
    const {report}=req.body
    try {
        
            Review.update(
                {
                    report: report,
                },
                {
                  where: { id: id },
                }
              );
                return res.send('Reported')

    } catch (error) {
        next(error)
    }
})


module.exports = router