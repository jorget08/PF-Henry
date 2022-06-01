const { Router } = require("express");
const { Book, User } = require("../db");
const router = Router();
const { Op } = require("sequelize");
const e = require("express");

router.post('/',async (req,res,next)=>{
    try {
        const{user, favs}=req.body
        const userFound= await User.findByPk(user)
        userFound.addBook(favs)
        return res.status(200)
    } catch (error) {
        next(error)
    }
})
router.get('/',async (req,res,next)=>{
    try {
        const {user}=req.query;
        const userFound=await User.findByPk(user,{include:Book})
        return res.json(userFound)
    } catch (error) {
        next(error)
    }
})
module.exports=router