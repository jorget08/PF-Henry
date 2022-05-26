const { Router } = require('express');
const {Book, Category} = require('../db');
const router = Router();

router.post('/book', async (req, res, next) => {
    try {
        const {title, author, description, stock, image, price, categories} = req.body
        const bookCreated = await Book.create({
            title,
            author,
            description,
            stock,
            image,
            price
        })
        for (let i = 0; i < categories.length; i++) {
            const cat = await Category.findOne({
                where: {
                    name: categories[i]
                }
            })
            bookCreated.addCategory(cat)
        }
        res.status(200).send("Book created successfully")
    }
    catch(err){
        next(err)
    }
})

router.put('/book/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        const {title, author, description, stock, image, price, categories} = req.body
        if(id){
            if(title){
                await Book.update({
                    title: title
                },{
                    where: {id: id}
                })
            }
            if(author){
                await Book.update({
                    author: author
                },{
                    where: {id: id}
                })
            }
            if(description){
                await Book.update({
                    description: description
                },{
                    where: {id: id}
                })
            }
            if(stock){
                await Book.update({
                    stock: stock
                },{
                    where: {id: id}
                })
            }
            if(image){
                await Book.update({
                    image: image
                },{
                    where: {id: id}
                })
            }
            if(price){
                await Book.update({
                    price: price
                },{
                    where: {id: id}
                })
            }
            if(categories.length){
                let arr = []
                let book = await Book.findOne({
                    where: {
                        id: id
                    }
                })
                for (let i = 0; i < categories.length; i++) {
                    const cat = await Category.findOne({
                        where: {name: cat[i]}
                    })
                    arr.push(cat)
                }
                    await book.setCategory(arr[0])
                    if(arr[1]){
                        for (let i = 1; i < arr.length; i++) {
                            await book.addCategory(arr[i])
                        }
                    }
            }
        }
    } catch (error) {
        next(error)
    }
})

router.delete('/delete/book/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        Book.destroy({
            where: {id: id}
        })
        res.send("Book deleted")
    } catch (error) {
        next(error)
    }
})