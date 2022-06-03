const { Router } = require("express");
const {Category } = require('../db')
const router = Router()
const { Op } = require('sequelize')

router.get('/', async (req,res,next)=>{
    try {
        const categories= await Category.findAll()

        res.json(categories)
    } catch (error) {
        next(error)
    }
    
})

module.exports=router;