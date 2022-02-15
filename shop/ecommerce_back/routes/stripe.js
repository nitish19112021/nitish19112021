const stripe = require('stripe')('sk_test_tR3PYbcVNZZ796tH88S4VQ2u')

const router = require('express').Router();

const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client

    const price = 100;
    const quantity = 2

    return items = price*quantity;
  };
  
  router.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;
  
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "INR",
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
      amount:paymentIntent.amount
    });
  });


  module.exports = router 