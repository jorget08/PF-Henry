require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, API_KEY} = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/books`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Book, Rol, Category, User, Shop, Review, Order, Payment, Paymentbook, Support, Paymentcrypto } =
  sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Book.belongsToMany(User, { through: "favourites" });
User.belongsToMany(Book, { through: "favourites" });

Book.belongsToMany(Category, { through: "bookxcategory" });
Category.belongsToMany(Book, { through: "bookxcategory" });

Book.belongsToMany(Shop, { through: "bookxshop" });
Shop.belongsToMany(Book, { through: "bookxshop" });

User.hasMany(Review);
Review.belongsTo(User);

Book.hasMany(Review);
Review.belongsTo(Book);



//? usuario tiene muchos rol
User.belongsToMany(Rol, { through: "userxrol" });
Rol.belongsToMany(User, { through: "userxrol" });

User.hasOne(Shop);
Shop.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasOne(Shop);
Shop.belongsTo(Order);

User.belongsToMany(Payment, { through: "userxpayment" })
Payment.belongsToMany(User, { through: "userxpayment" })

User.belongsToMany(Paymentcrypto, { through: "userxpaymentcrypto" })
Paymentcrypto.belongsToMany(User, { through: "userxpaymentcrypto" })

Paymentcrypto.hasMany(Paymentbook);
Paymentbook.hasOne(Paymentcrypto, { foreginKey: "id" });

Payment.hasMany(Paymentbook);
Paymentbook.hasOne(Payment, { foreginKey: "id" });

//? support 
Support.belongsTo(User);
User.hasMany(Support);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js')
  API_KEY
};
