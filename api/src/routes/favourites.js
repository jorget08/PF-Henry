const { Router } = require("express");
const { Book, User } = require("../db");
const router = Router();
const { Op } = require("sequelize");
const e = require("express");

router.post("/", async (req, res, next) => {
  const { user, favs } = req.body;
  try {
    
    
    const userFound = await User.findByPk(user);
    
    await userFound.addBook(favs);

    const final = await User.findByPk(user, { include: Book });

    return res.json(final.books);
  } catch (error) {
    next(error);
  }
});
router.delete('/', async(req,res,next)=>{
  const { user, favs } = req.query;
  
  try {
    
    const userFound = await User.findByPk(user, { include: Book });
    await userFound.removeBook(favs)
    const final = await User.findByPk(user, { include: Book });
    return res.json(final.books);

  } catch (error) {
    next(error)
  }
})
router.get('/fav',async (req,res,next)=>{
  const {book,user}=req.query
  let exist =true
  try {
    const UserFaound= await User.findByPk(user)
    const bookFound= await UserFaound.getBooks({where:{id:book}})
    console.log(bookFound.length)
    if(bookFound.length==0) {
      exist=false
    }
    res.send(exist)
  } catch (error) {
    next(error)
    
  }
})
router.get("/", async (req, res, next) => {
  try {
    const { user } = req.query;
    const userFound = await User.findByPk(user, { include: Book });
    return res.json(userFound.books);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
