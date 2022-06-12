const bcrypt = require('bcrypt');
const { User, Rol } = require("../db");
const { generateJwt } = require('../helpers/generateJwt');
const nodemailer = require('nodemailer')

const createUser = async (req, res) => {
    //? agregar usuario  //? phone
    const { name, lastName, email, password, imgProfile = 'https://fundacionmdi.com/wp-content/uploads/2021/05/img-user0.png' } = req.body;
    try {
        //? validar nickname !importante y email
        const existEmail = await User.findOne({ where: { email } });
        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya esta registrado'
            });
        }
        //? encriptar password
        const salt = await bcrypt.genSalt(10);
        const passEncript = bcrypt.hashSync(password, salt);
        //? crear usuario y asignar rol user por defecto 
        const roles = await Rol.findOne({ where: { name: 'user' } });
        
        const user = await User.create({
            name,
            lastName,
            email,
            password: passEncript,
            imgProfile,
            favoritos: [],        
        });  
        //? asignar rol a userxrol 
        await user.addRols(roles);

        user.password = undefined;
        //? enviar email de confirmacion de registro
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bookstore1511@gmail.com',
                pass: 'qyrvkdsvuzwgotne'
            }
        });
        const mailOptions = {
            from: "BookStore <",
            to: user.email,
            subject: 'Confirmation of registration',
            text: 'Hello ' + user.name + ' ' + user.lastName + '\n\n' +
                'Thank you for registering on BookStore.\n' +
                'To confirm your registration, please click on the following link:\n\n' +
                'http://localhost:3000/confirmation/' + user.idUser + '\n\n' +
                "If it doesn't work, copy and paste the link into your browser.\n\n" +
                'Thank you,\n' +
                'BookStore'
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        //? generar jwt
        const token = await generateJwt(user.idUser);
        //? respuesta
        res.json({
            ok: true,
            user,
            token
        });

    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

}
const getUserId=async (req,res)=>{
    const {id} = req.params
    try {
        const user = await User.findByPk(id,{
            attributes: { exclude: ['password'] },
            include: {
                model: Rol,
                attributes: ['name']
            }
            
        });
        //? 
        // const users = user.map(user=>{
        //     if(user.adress !== null){
        //         user.adress = JSON.parse(user.adress);
        //     }
        //     return user;
        // })
        res.json(user);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}
const getUsers = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; 
    try {
        //? paginacion 
        const start = (page - 1) * limit;
        const end = page * limit;
        //? contar usuarios
        const count = await User.count();
        //? obtener usuarios
        const user = await User.findAll({
            attributes: { exclude: ['password'] },
            include: {
                model: Rol,
                attributes: ['name']
            },
            offset: start,
            limit: end,
            raw:true, // <----- HERE
            nest:true
        });
        //? 
        const users = user.map(user=>{
            if(user.adress !== null){
                user.adress = JSON.parse(user.adress);
            }
            return user;
        })
        res.json({
            ok: true,
            users,
            total: count
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}
const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const userExist = await User.findOne({ where: { idUser: id } });
        if (!userExist) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }
        //? eliminar email de req.body
        if (req.body.email) {
            delete req.body.email;
        }
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const passEncript = bcrypt.hashSync(req.body.password, salt);
            req.body.password = passEncript;
        }

        if (req.body.adress) {
            let adress = userExist.adress;
            adress === null ? adress = [] : adress;
            //? si adress es un array
            if (Array.isArray(adress)) {
                adress.push(req.body.adress);
                req.body.adress = JSON.stringify(adress);
            }
            else{
                //? si adress es un string parsearlo
                let adress = JSON.parse(userExist.adress);
                let arrayObject = [...adress, req.body.adress];
                req.body.adress = JSON.stringify(arrayObject);
            }   
        }

        await User.update(req.body, {
            where: { idUser: id }
        });
        const userUp = await User.findOne({
            where: { idUser: id },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: {
                model: Rol,
                attributes: ['name']
            },
            raw:true, // <----- HERE
            nest:true
        });
        //? no mandar array
        const adress = JSON.parse(userUp.adress);
        userUp.adress = adress;
        //? respuesta
        res.json({
            ok: true,
            userUp,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const userExist = await User.findOne({ where: { idUser: id } });
        if (!userExist) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }
        await User.destroy({ where: { idUser: id } });
        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

module.exports = { createUser, getUsers, updateUser, deleteUser, getUserId };

