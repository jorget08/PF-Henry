const { Router } = require("express");
const { Book, Category } = require("../db");
const router = Router();
const { Op, Sequelize } = require("sequelize");
const axios = require("axios");
const API_KEY = require('../db')

router.get('/', async (req, res, next) => {
    const alphabet = ["la", "el", "lo", "ca", "va", "de","son","the","harry","star","star wars", "game of","señor de lo anillos"];
    //["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","u","v","w","x","y","z"]
    let arr = []


    try {
        for (const leter of alphabet) {
            let result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${leter}&maxResults=40&printType=books&key=AIzaSyCq_sKYohrgR0j35LfVEa0fEBkRmlDIG4Q`);
            arr.push(result.data.items)
        }
        
        let concatened = [].concat.apply([], arr)
        let filtrados = concatened.map((e) => {
            if (e.volumeInfo.title && 
                e.volumeInfo.authors &&
                e.volumeInfo.description &&
                e.volumeInfo.imageLinks &&
                e.volumeInfo.categories
            ) {return e}
        })
        //  let alaBd= filtrados.map((e)=>{
        //     return {
        //     title: e.volumeInfo.title?e.volumeInfo.title:'no tiene',
        //     author:e.volumeInfo.authors? e.volumeInfo.authors:'no tiene',
        //     description: e.volumeInfo.title?e.volumeInfo.title:'no tiene',
        //     score: e.volumeInfo.averageRating? Math.ceil(e.volumeInfo.averageRating):Math.floor(Math.random() * 5)+1,
        //     image: e.volumeInfo.imageLinks.thumbnail?e.volumeInfo.imageLinks.thumbnail:'no tiene',
        //     price: e.saleInfo.listPrice? Math.ceil(e.saleInfo.listPrice.amount):Math.floor(Math.random() * 10000)+1,
        //     categories:e.volumeInfo.categories?e.volumeInfo.categories :'no tiene' 
        // }

        //  })
        res.send(filtrados[0].volumeInfo)
    } catch (error) {
        console.log(error)
    }




})
module.exports = router
