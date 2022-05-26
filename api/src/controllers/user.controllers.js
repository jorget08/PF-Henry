const bcrypt = require('bcrypt');
const { Users, Roles } = require("../db");
const { generateJwt } = require('../helpers/generateJwt');
const nodemailer = require('nodemailer')

const createUser = async (req, res) => {
    //? agregar usuario  //? phone
    const { name, lastName, email, password } = req.body;
    try {
        //? validar nickname !importante y email
        const existEmail = await Users.findOne({ where: { email } });
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
        const roles = await Roles.findOne({ where: { name: 'user' } });
        const user = await Users.create({
            name,
            lastName,
            email,
            password: passEncript,
            imgProfile: 'https://res.cloudinary.com/dzqbzqgqy/image/upload/v1598418856/default_profile_img_zqbzqgqy.png',
            favoritos: [],
            roleIdRole: roles.idRole            
        });  
        user.password = undefined;
        //? enviar email de confirmacion de registro
        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'nachoburgos1995@gmail.com',
        //         pass: 'mtlsdatewtbcwhbf'
        //     }
        // });
        // const mailOptions = {
        //     from: "SevenDevsNfts <",
        //     to: usuario.email,
        //     subject: 'Confirmation of registration',
        //     text: 'Hello ' + usuario.firstName + ' ' + usuario.lastName + '\n\n' +
        //         'Thank you for registering on SevenDevsNfts.\n' +
        //         'To confirm your registration, please click on the following link:\n\n' +
        //         'http://localhost:3000/confirmar/' + usuario._id + '\n\n' +
        //         "If it doesn't work, copy and paste the link into your browser.\n\n" +
        //         'Thank you,\n' +
        //         'SevenDevsNfts'
        // };
        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('Email sent: ' + info.response);
        //     }
        // });
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
const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['idUser', 'name', 'lastName', 'email', 'imgProfile', 'roleIdRole'],
            include: [{
                model: Roles,
                attributes: ['name']
            }]
        });
        res.json({
            ok: true,
            users
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

module.exports = { createUser, getUsers };

