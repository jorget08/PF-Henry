const { Router } = require("express");
const router = Router();
const axios = require('axios')
const request = require('request')

const CLIENT = 'AedHqcqiFSOl1dsb7J7dZchQ0he5lHdaixdvexVbMj4nh7U9d_pS89GrsOZQLvC97-bz4bHLRDEv-Ig6'
const SECRET = 'EO_245Otxykbgwqzv415XRZZNVYPkkgjeLx6M7omblEeVN94_Anp45LwxMOe8mwh28hfOAByv7KPAiAj'
const PAYPAL_API = 'https://api-m.sandbox.paypal.com'

const auth = {user: CLIENT, pass: SECRET}

const createPayment = async (req, res, next) => {
    
    try{
        const body = {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD', //https://developer.paypal.com/docs/api/reference/currency-codes/
                    value: '115'
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
        request.post(`${PAYPAL_API}/v2/checkout/orders`, {
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
        request.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
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
    
    
router.post("/", createPayment)
router.get("/execute-payment", executePayment)

module.exports = router;
