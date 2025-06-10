// server/routes/stripe.js
const express = require("express");
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
 // use your test secret key

router.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Hackathon Registration",
          },
          unit_amount: 5000, // $50.00
        },
        quantity: 1,
      },
    ],
    success_url: "http://localhost:5173",
    cancel_url: "http://localhost:5173/login",
  });

  res.json({ id: session.id });
});

module.exports = router;
