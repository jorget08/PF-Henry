const axios = require("axios");
const { API_KEY } = process.env;
async function datos() {
  const alphabet = [
    "house",
    "forest",
    "spider",
    "star trek",
    "the",
    "harry",
    "star",
    "star wars",
    "game of",
    "ring",
    "off",
    "tree",
    "last",
    "fast",
    "crypto",
  ];

  let arr = [];

  try {
    for (const leter of alphabet) {
      let result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${leter}&maxResults=40&printType=books&key=${API_KEY}`
      );
      arr.push(result.data.items);
    }

        let concatened = [].concat.apply([], arr)
        let filtrados = concatened.map((e) => {
            if (e.volumeInfo.title &&
                e.volumeInfo.authors &&
                e.volumeInfo.description &&
                e.volumeInfo.imageLinks &&
                e.volumeInfo.categories
            ) { return e }
        })
        let nuevo = filtrados.filter((e) => e)
        let alaBd = nuevo.map((e) => {
            return {
                title: e.volumeInfo.title,
                author: e.volumeInfo.authors.toString(),
                description: e.volumeInfo.description,
                score: e.volumeInfo.averageRating ? Math.ceil(e.volumeInfo.averageRating) : Math.floor(Math.random() * 5) + 1,
                stock: Math.floor(Math.random() * 10) + 1,
                image: e.volumeInfo.imageLinks.thumbnail,
                price: e.saleInfo.listPrice ? Math.ceil((e.saleInfo.listPrice.amount) / 125) : Math.ceil(Math.floor(Math.random() * 200) + 1),
                categories: e.volumeInfo.categories
            }})


    return alaBd;
   }catch (error) {
    console.log(error);
  }
}

module.exports = datos;
