const { Book, Category } = require('../db.js')
const data = require('./database')
const dataCategories = require('./databaseCategory')
function dataBaseLoadCategories() {
    categoriesApi = dataCategories.map(category => {
        return category = {
            name: category.name
        }
    })
    Category.bulkCreate(categoriesApi)
}
async function dataBaseLoad() {

    apiBooks = data.map(book => {
        
        book = {

            title: book.title.slice(0,book.title.indexOf(':')),
            author: book.author,
            description: book.description,
            score: Math.round(book.score.slice(0,3)),
            image: book.image,
            price: parseInt(book.price.slice(1),10) ,
            categories: book.categories

        }
        return book

    })
    console.log(apiBooks[0])
    apiBooks.forEach(async (book) => {

        const bookCreado = await Book.create(book)

        book.categories.map(async (cat) => {
            console.log('name caaat', cat)
            const catEncontrado = await Category.findOne({
                where: {
                    name: cat
                }
            })
            bookCreado.addCategory(catEncontrado)
        })
    });

}


module.exports = { dataBaseLoad, dataBaseLoadCategories }