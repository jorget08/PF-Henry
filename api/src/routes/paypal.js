const { Router } = require("express");
const router = Router();
const axios = require('axios')
const request = require('request')
const {CLIENT, SECRET, PAYPAL_API} = process.env
const auth = {user: CLIENT, pass: SECRET}
const { Payment, Book, Paymentbook, User } = require("../db");


const createPayment = async (req, res, next) => {
    
    try{
        console.log(PAYPAL_API)
        //const {value} = req.body
        const body = {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD', //https://developer.paypal.com/docs/api/reference/currency-codes/
                    value: '200'
                },
                description: "purchase of books"
            }],
            application_context: {
                brand_name: `PF Henry Books`,
                landing_page: 'NO_PREFERENCE', // Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
                user_action: 'PAY_NOW', // Accion para que en paypal muestre el monto del pago
                return_url: `http://localhost:3001/paypal/execute-payment`, // Url despues de realizar el pago
                cancel_url: `http://localhost:3001/cancel-payment` // Url despues de realizar el pago
            }
        }
        request.post(`https://${PAYPAL_API}/v2/checkout/orders`, {
            auth,
            body,
            json: true
        }, (err, response) => {
            res.json({ data: response.body })
        })
    }catch(err){
        //console.log(error.message);
    return res.status(500).json("Something goes wrong");
    }
}


const executePayment = async (req, res) => {
    const { token } = req.query;
    
    try {
        request.post(`https://${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
            auth,
            body: {},
            json: true
        }, (err, response) => {
            res.json({ data: response.body })
        })
    } catch (error) {
        //console.log(error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
  };
  
const cancelPayment = (req, res) => {
    res.redirect("/");
    };
    
    
router.post("/paypal/back", createPayment)
router.get("/execute-payment", executePayment)

router.post("/", async (req, res, next) => {
    try {
        const {data, totalPrice, infoBook, userId} = req.body
        const {orderID, payerID, paymentSource} = data
        console.log(userId)
        for (let i = 0; i < infoBook.length; i++) {
            let b = await Book.findOne({
                where: {
                    id: infoBook[i].id
                }
            })
            await b.update({
                stock: b.stock - infoBook[i].cant
            })
        }

        
        let books = infoBook.map(e => {return{
            title: e.title,
            author: e.author,
            image: e.image,
            price: e.price,
            total: e.total,
            cant: e.cant
        }})
        let paymentBooks = await Paymentbook.bulkCreate(books)
        
        const paymentCreated = await Payment.create({
            orderID,
            payerID,
            paymentSource,
            totalPrice
        })
        
        const user = await User.findOne({
            where: {
                idUser: userId
            }
        })
        user.addPayment(paymentCreated)

        for (let i = 0; i < paymentBooks.length; i++) {
            const book = await Paymentbook.findOne({
                where: {
                    id: paymentBooks[i].id
                }
            })
            paymentCreated.addPaymentbook(book)
        }


    } catch (error) {
        next(error)
    }
})

router.get("/payments/:id", async (req, res, next) => {
    try {
        const {id} = req.params
        const user = await User.findOne({
            where : {
                idUser: id
            },
            include:{
                model: Payment,
                include: Paymentbook
            }
        })

        res.json(user)
    } catch (error) {
        next(error)
    }
})

module.exports = router;