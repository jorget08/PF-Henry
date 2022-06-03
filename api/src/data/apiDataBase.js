const axios = require("axios");
const {API_KEY} = process.env;
async function datos() {
    const alphabet = ["la", "el", "lo", "ca", "va", "de", "son", "the", "harry", "star", "star wars", "game of", "señor de lo anillos"];
    
    let arr = []


    try {
        for (const leter of alphabet) {
            let result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${leter}&maxResults=40&printType=books&key=${API_KEY}`);
            arr.push(result.data.items)
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
                author: e.volumeInfo.authors[0],
                description: e.volumeInfo.description,
                score: e.volumeInfo.averageRating ? Math.ceil(e.volumeInfo.averageRating) : Math.floor(Math.random() * 5) + 1,
                image: e.volumeInfo.imageLinks.thumbnail,
                price: e.saleInfo.listPrice ? Math.ceil((e.saleInfo.listPrice.amount) / 125) : Math.ceil((Math.floor(Math.random() * 10000) + 1) / 125),
                categories: e.volumeInfo.categories
            }

        })
        
        return alaBd
    } catch (error) {
        console.log(error)
    }
}

module.exports=datos