import type { NextApiRequest, NextApiResponse } from 'next';
let environment = process.env.NEXT_PUBLIC_VERCEL_ENV;
let stripekey = environment === "development" ? process.env.NEXT_PUBLIC_STRIPE_SECRET_PRIVATE : process.env.NEXT_PUBLIC_STRIPE_SECRET_PRIVATE_TEST;
const stripe = require("stripe")(stripekey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const reqBody = JSON.parse(req.body);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: reqBody.amount,
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.status(200).json({
    clientSecret: paymentIntent.client_secret,
  });
}