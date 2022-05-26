const { Router } = require("express");
const { Book, Category } = require('../db')
const router = Router()
const { Op } = require('sequelize')





router.get('/', async (req, res, next) => {
    try {
        const { titleOrAuthor, score, rango1, rango2,category } = req.query
        if (score) {
            const bookScores= await Book.findAll({
                where:{
                    score:score
                }
            })
            return res.json(bookScores)

        }
        if(rango1 && rango2){

            const bookRange= await Book.findAll({
                where:{
                    price:{[Op.between]:[rango1,rango2],
                    },  
                },
                order:[['price','ASC']]
            })
            return res.json(bookRange)
        }
        if (category) {
            const bookCategory= await Book.findAll({
               
                include:{
                    model:Category,
                    where:{
                        name:category
                    }
                }
            })
            
            return res.json(bookCategory)
        }
        if (titleOrAuthor) {
            const bookFound = await Book.findAll({
                where: {
                    title: {
                        [Op.iLike]: `%${titleOrAuthor}%`
                    }
                }
            })
            const authorFound = await Book.findAll({
                where: {
                    author: {
                        [Op.iLike]: `%${titleOrAuthor}%`
                    }
                }
            })

            let allfound = [].concat(bookFound, authorFound)

            let allfoundResult = [];
            let lookup = {};
            let id ='id'

            for (var i in allfound) {

                lookup[allfound[i][id]] = allfound[i];
            }

            for (i in lookup) {
                allfoundResult.push(lookup[i]);
            }


            if (allfoundResult.length !== 0) {
                return res.json(allfoundResult)
            } else return res.status(400).json({ msg: 'Book with this title or author does not exist' })
        }
        const books = await Book.findAll()

        return res.json(books)
    } catch (error) {
        next(error)
    }

})
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const bookFound = await Book.findByPk(id, { include: Category })
        if (bookFound.length !== 0) {
            return res.json(bookFound)

        } else return res.status(404).json({ msj: 'Not Found' })

    } catch (error) {
        next(error)
    }
})

// FIlterss



module.exports = router