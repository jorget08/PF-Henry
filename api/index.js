//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {dataBaseLoad,dataBaseLoadCategories}= require('./src/data/preLoad.js')
const { Rol, User } = require("./src/db");
const bcrypt = require('bcrypt');

const createRole = async () => {
    const [admin, user] = await Rol.bulkCreate([
        {
            name: 'admin',
            description: 'Administrador'
        },
        { 
            name: 'user',
            description: 'Usuario'
        }
    ]);
    console.log(`Roles creados: ${admin.name}, ${user.name}`);      
    //? create admin default 
    const pass = 'admin'
    const salt = await bcrypt.genSalt(10);
    const passEncript = bcrypt.hashSync(pass, salt);
    const adminUser = await User.create({
        name: 'admin',
        lastName: 'admin',
        email: 'admin@mail.com',
        password: passEncript,
        imgProfile: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
        confirmation: true
    });
    // assign role admin to user
    await adminUser.addRols(admin);
}


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    dataBaseLoadCategories()
    console.log('categories cargads')
    dataBaseLoad()
    createRole();
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
