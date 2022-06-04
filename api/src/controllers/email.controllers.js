const { User, Rol } = require("../db");
const nodemailer = require('nodemailer')
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

module.exports = { sendEmail };