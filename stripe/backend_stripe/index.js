require('dotenv').config()
const express = require('express');
const cors = require("cors");
const uuid = require('uuid');
//add stripe key
const stripe = require('stripe')("sk_test_51KMrD1SAicAzV7Ux5z8hPz4wBMnlh1BzUFALHPYSjLqMBkuR6B9YRUZdFwjim3ZS1zQJG6poadEzjaZXrtoTWoAq00alKnvN47");
const app = express();

//middleware
app.use(express.json());
app.use(cors())

//routes

app.get('/',(req,res)=>{
    res.send("stripe payment gateway")
})

app.post('payment', (req,res)=>{
    const{ product, token} = req.body;
    console.log("product", product);
    console.log("price", price)
    const idempontencyKey = uuid()
    return stripe.customers
        .create({
        email:token.email,
        source:token.id
            })
            .then(customer=>{
                stripe.charges.create({
                    amount:product.price * 100,
                    currency:'usd',
                    customer:customer.id,
                    recipt_email:token.email,
                    description: product.name,
                    shipping:{
                        name:token.card.name,
                        address:{
                            country:token.card.address_country,
                        }
                    }
                },{idempontencyKey})
            })
            .then(res=>{
                res.status(200).json(res)
            }).catch(err=>{
                console.log('err',err)
            })
      })

//server
const port = process.env.port
app.listen(port, ()=>{
    console.log("server started:"+port)
})

