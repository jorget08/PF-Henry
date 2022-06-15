const { User, Rol, Support } = require("../db");
const nodemailer = require('nodemailer')
var hbs = require('nodemailer-express-handlebars');
const path = require('path');
//sendEmail

const sendEmail = async (req, res) => {
    const { email, name, lastName, payment} = req.body;

    const totalPrice = payment.reduce((total, item) => {
        return total + item.price;
    }, 0);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bookstore1511@gmail.com',
            pass: 'qyrvkdsvuzwgotne'
        }
    });
    const handlebarOptions = {
        viewEngine: {
            extName: '.handlebars',
            partialsDir: path.resolve('src/views/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('src/views/'),
        extName: '.handlebars',
    }
    transporter.use('compile', hbs(handlebarOptions));

    const mailOptions = {
        from: "BookStore <",
        to: email,
        subject: 'Confirmation of payment',
        template: 'purchase',
        context: {
            email,
            name,
            lastName,
            payment,
            totalPrice
        }
        
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });   
    res.json({
        ok: true,
        msg: 'Email sent'
    });
}
const sendEmailPassword = async (req, res) => {
    const { email} = req.body;
    console.log(req.body)
    const user = await User.findOne({ where: { email } });
        
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bookstore1511@gmail.com',
            pass: 'qyrvkdsvuzwgotne'
        }
    });
    const handlebarOptions = {
        viewEngine: {
            extName: '.handlebars',
            partialsDir: path.resolve('src/views/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('src/views/'),
        extName: '.handlebars',
    }
    transporter.use('compile', hbs(handlebarOptions));

    const mailOptions = {
        from: "BookStore <",
        to: email,
        subject: 'Change Password',
        template: 'forgotPassword',
        context: {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            id: user.idUser,
        }
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });   
    res.json({
        ok: true,
        msg: 'Email sent'
    });
}
const sendEmailSupport = async (req, res) => {
    const { email, name, message } = req.body;

    try {
        //? si no viene el email no se envia el correo 
        if (!email || !name || !message) {
            return res.json({
                ok: false,
                msg: 'Email not sent'
            });
        }
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bookstore1511@gmail.com',
                pass: 'qyrvkdsvuzwgotne'
            }
        });
        const handlebarOptions = {
            viewEngine: {
                extName: '.handlebars',
                partialsDir: path.resolve('src/views/'),
                defaultLayout: false,
            },
            viewPath: path.resolve('src/views/'),
            extName: '.handlebars',
        }
        transporter.use('compile', hbs(handlebarOptions));
    
        const mailOptions = {
            from: "BookStore <",
            to: email,
            subject: 'Support - BookStore',
            template: 'email',
            context: {
                name,
                message
            },
            
        };     
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });   
    
        //? buscar support por email
        const support = await Support.findOne({ where: { email } });
        if (support) {
            //? actualizar status a 1
            await Support.update({ status: 1 }, { where: { idSupport: support.idSupport } });
        }
        
        res.json({
            ok: true,
            msg: 'Email sent'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

}

module.exports = { sendEmail, sendEmailPassword, sendEmailSupport };