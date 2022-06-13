const { User, Rol } = require("../db");
const nodemailer = require('nodemailer')
var hbs = require('nodemailer-express-handlebars');
const path = require('path');
//sendEmail

const sendEmail = async (req, res) => {
    const { email, name, lastName, payment} = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bookstore1511@gmail.com',
            pass: 'qyrvkdsvuzwgotne'
        }
    });
    const mailOptions = {
        from: "BookStore <",
        to: email,
        subject: 'Confirmation of payment',
        text: 'Hello ' + name + ' ' + lastName + '\n\n' +
            'Thank you for purchase on BookStore.\n' +
            'Thank you,\n' +
            `${payment?.map(item=>{
                return `${item.title} - ${item.price}`
            })}`
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
    const mailOptions = {
        from: "BookStore <",
        to: email,
        subject: 'Change Password',
        text: 'Hello ' + user.name + ' ' + user.lastName + '\n\n' +
        'If you have requested a change in your password please enter the link below:\n' +
        'http://localhost:3000/password/' + user.idUser + '\n\n' +
        "If you have not please ignore this mail.\n\n" +
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
    res.json({
        ok: true,
        msg: 'Email sent'
    });
}
const sendEmailSupport = async (req, res) => {
    const { email, name, message } = req.body;
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
    res.json({
        ok: true,
        msg: 'Email sent'
    });

}

module.exports = { sendEmail, sendEmailPassword, sendEmailSupport };