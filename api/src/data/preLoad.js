const { Book, Category } = require("../db.js");
const data = require("./database");
const dataCategories = require("./databaseCategory");
const dataApi = require("./apiDataBase");

function dataBaseLoadCategories() {
  categoriesApi = dataCategories.map((category) => {
    return (category = {
      name: category.name,
      img: category.img,
    });
  });
  Category.bulkCreate(categoriesApi);
}
async function dataBaseLoad() {
  const datasApi = await dataApi();
 // arreglo
  //-------------Carga categories Api-----------
  let categoriesApi = await Promise.all(
    datasApi.map(async (e) => {
      return e.categories;
    })
  ).then((res) => {
    return res;
  });

  categoriesApi = categoriesApi.flat(1);

  let unicos = [...new Set(categoriesApi)];

  unicos = unicos.map((e) => {
    return { name: e };
  });
  await Category.bulkCreate(unicos);
  // //--------------------------------------------------------
  // //-----------Api Books--------------
  datasApi.forEach(async (book) => {
    const bookCreado = await Book.create(book);

    book.categories.map(async (cat) => {
      const catEncontrado = await Category.findOne({
        where: {
          name: cat,
        },
      });
      bookCreado.addCategory(catEncontrado);
    });
  });
  //----------------------------------------------------------
  apiBooks = data.map((book) => {
    book = {
      title: book.title.includes(":")
        ? book.title.slice(0, book.title.indexOf(":"))
        : book.title,
      author: book.author,
      description: book.description,
      score: Math.round(book.score.slice(0, 3)),
      image: book.image,
      price: parseInt(book.price.slice(1), 10),
      categories: book.categories,
    };
    return book;
  });

  apiBooks.forEach(async (book) => {
    const bookCreado = await Book.create(book);

    book.categories.map(async (cat) => {
      const catEncontrado = await Category.findOne({
        where: {
          name: cat,
        },
      });
      bookCreado.addCategory(catEncontrado);
    });
  });
  console.log("datos cargados api y bd");
}
//arreglo

module.exports = { dataBaseLoad, dataBaseLoadCategories };
