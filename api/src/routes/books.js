const { Router } = require("express");
const { Book, Category } = require("../db");
const router = Router();
const { Op, Sequelize } = require("sequelize");


router.get("/maxnum", async (req, res, next) => {
  try {
    const maxFound= await Book.findAll({attributes: [[Sequelize.fn('max', Sequelize.col('price')), 'max']]})
    res.json(maxFound[0])
  } catch (error) {
    next(error)
  }
})
router.get("/", async (req, res, next) => {
  try {
    const { titleOrAuthor, score, rango1, rango2, category } = req.query;
    if (score) {
      const bookScores = await Book.findAll({
        where: {
          score: score,
        },
      });
      return res.json(bookScores);
    }
    if (rango1 && rango2) {
      const bookRange = await Book.findAll({
        where: {
          price: { [Op.between]: [rango1, rango2] },
        },
        order: [["price", "ASC"]],
      });
      return res.json(bookRange);
    }
    if (category) {
      const bookCategory = await Book.findAll({
        include: {
          model: Category,
          where: {
            name: category,
          },
        },
      });

      return res.json(bookCategory);
    }
    if (titleOrAuthor) {
      const bookFound = await Book.findAll({
        where: {
          title: {
            [Op.iLike]: `%${titleOrAuthor}%`,
          },
        },
      });
      const authorFound = await Book.findAll({
        where: {
          author: {
            [Op.iLike]: `%${titleOrAuthor}%`,
          },
        },
      });

      let allfound = [].concat(bookFound, authorFound);

      let allfoundResult = [];
      let lookup = {};
      let id = "id";

      for (var i in allfound) {
        lookup[allfound[i][id]] = allfound[i];
      }

      for (i in lookup) {
        allfoundResult.push(lookup[i]);
      }

      if (allfoundResult.length !== 0) {
        return res.json(allfoundResult);
      } else
        return res
          .status(400)
          .json({ msg: "Book with this title or author does not exist" });
    }
    const books = await Book.findAll({ include: Category });

    return res.json(books);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const bookFound = await Book.findByPk(id, { include: Category });
    if (bookFound.length !== 0) {
      return res.json(bookFound);
    } else return res.status(404).json({ msj: "Not Found" });
  } catch (error) {
    next(error);
  }
});


router.post("/", async (req, res, next) => {
  try {
    const { title, author, description, stock, image, price, categories } =
      req.body;
    const bookCreated = await Book.create({
      title,
      author,
      description,
      stock,
      image,
      price,
    });
    for (let i = 0; i < categories.length; i++) {
      const cat = await Category.findOne({
        where: {
          name: categories[i],
        },
      });
      bookCreated.addCategory(cat);
    }
    res.status(200).send("Book created successfully");
  } catch (err) {
    next(err);
  }
});

router.put("/book/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, author, description, stock, image, price, categories } =
      req.body;
    if (id) {
      if (title) {
        await Book.update(
          {
            title: title,
          },
          {
            where: { id: id },
          }
        );
      }
      if (author) {
        await Book.update(
          {
            author: author,
          },
          {
            where: { id: id },
          }
        );
      }
      if (description) {
        await Book.update(
          {
            description: description,
          },
          {
            where: { id: id },
          }
        );
      }
      if (stock) {
        await Book.update(
          {
            stock: stock,
          },
          {
            where: { id: id },
          }
        );
      }
      if (image) {
        await Book.update(
          {
            image: image,
          },
          {
            where: { id: id },
          }
        );
      }
      if (price) {
        await Book.update(
          {
            price: price,
          },
          {
            where: { id: id },
          }
        );
      }
      if (categories.length) {
        let arr = [];
        let book = await Book.findOne({
          where: {
            id: id,
          },
        });
        for (let i = 0; i < categories.length; i++) {
          const cat = await Category.findOne({
            where: { name: categories[i] },
          });
          arr.push(cat);
        }
        await book.setCategories(arr[0]);
        if (arr[1]) {
          for (let i = 1; i < arr.length; i++) {
            await book.addCategories(arr[i]);
          }
        }
      }
      res.send("Se actualizo");
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/delete/book/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    Book.destroy({
      where: { id: id },
    });
    res.send("Book deleted");
  } catch (error) {
    next(error);
  }
});

// FIlterss
router.get('/land/filter', async (req, res, next) => {
  try {
    const { score } = req.query

    const books = await Book.findAll({
      where: {
        score: score,
      },
      limit: 10
    });
    return res.json(books);

  } catch (error) {
    next(error)
  }
})

router.get('/landing/:adv/:th/:cf', async (req, res, next) => {
  try {

    const { adv, th, cf } = req.params

    let obj = {}

    const book1 = await Book.findAll({
      include: {
        model: Category,
        where: {
          name: adv,
        },
      },
    })
    obj = { ...obj, [adv]: book1 }
    const book2 = await Book.findAll({
      include: {
        model: Category,
        where: {
          name: th,
        },
      },
    })
    obj = { ...obj, [th]: book2 }
    const book3 = await Book.findAll({
      include: {
        model: Category,
        where: {
          name: cf,
        },
      },
    })
    obj = { ...obj, [cf]: book3 }

    res.json(obj)


  } catch (error) {
    next(error)
  }
})

module.exports = router;
