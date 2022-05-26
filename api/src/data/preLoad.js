const {Book, Category} = require('../db.js')
const data=require('./database')
const dataCategories=require('./databaseCategory')
function dataBaseLoad(){
    console.log('data',data[0])
    apiBooks=data.map(book=>{
        return book={
 
            title:book.title,
            author:book.author,
            description:book.description,
            score:book.score,
            image:book.image,
            price:book.price,

        }
    })
    console.log('apiBooks',apiBooks)
    Book.bulkCreate(apiBooks)
}
function dataBaseLoadCategories(){
    categories=dataCategories.map(category=>{
        return category={
            name:category.name
        }
    })
    Category.bulkCreate(categories)
}
module.exports={dataBaseLoad,dataBaseLoadCategories}