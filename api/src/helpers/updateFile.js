const cloudinary = require('cloudinary').v2;
//? modelos
const { User, Rol, Book } = require("../db");

//? cloudinary config
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY_CL,  
    api_secret: process.env.API_SECRET_CL,  
    shorten: true,
    secure: true
});

const updateImageCloudinary = async(tipo, id, url) => {

    switch (tipo) {
        case 'user':
            const userFile = await User.findOne({
                where: {
                    idUser: id
                }
            });
            console.log(userFile, url, tipo);
            if (!userFile) {
                return false;
            }
            //? actualizar imagen
            await User.update({
                imgProfile: url
            }, {
                where: {
                    idUser: id
                }
            });

            return true;
        case 'book':
            const bookFile = await Book.findOne({
                where: {
                    id
                }
            });
            if (!bookFile) {
                return false;
            }
            //? actualizar imagen
            await Book.update({
                image: url
            }, {
                where: {
                    id
                }
            });
            
            return true;
        default:
            return false;
    }  

}

module.exports = { updateImageCloudinary };