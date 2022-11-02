import fetch from "node-fetch";
// models
import User from "../models/User.js";
import Earning from "../models/Earning.js";

import Stripe from "stripe";
import jwt from "jsonwebtoken";
// setting dotenv
import "dotenv/config";
import Payment from "../models/Payments.js";

let cb = "";
// const clientId = process.env.CLIENT_ID;
// const clientSecret = process.env.CLIENT_SECRET;

if (process.env.ENVIRONMENT === "production") {
  cb = process.env.WEB_CALL_BACK;
} else {
  cb = process.env.CALL_BACK;
}
const endPointSecret = process.env.EndPoint;
const stripe = new Stripe(process.env.STRIPE_SK);

async function config(req, res) {
  const key = process.env.STRIPE_PK;
  res.send(key);
}

async function checkoutSession(req, res) {
  try {
    const { price_id } = req.body;

    const discordUser = req.cookies.DiscordUser;
    const userCookie = jwt.verify(discordUser, process.env.API_TOKEN);

    const session = await stripe.checkout.sessions.create({
      client_reference_id: userCookie.userid,
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${cb}/checkout?type=pack&success=${price_id}`,
      cancel_url: `${cb}/checkout?canceled=${price_id}`,
    });

    console.log(session);

    res.redirect(303, session.url);
  } catch (error) {
    res.send({ message: error.message });
  }
}

// TODO: fill me in
const fulfillOrder = async (session) => {
  const userid = session.client_reference_id;
  const transactionid = session.id;
  let pkg = "";
  const dollar = session.amount_total / 100;
  let stars = 0;
  let diamonds = 0;

  if (dollar === 5) {
    stars = 100;
    diamonds = 2;
    pkg = "BASIC";
  } else if (dollar === 25) {
    stars = 550;
    diamonds = 11;
    pkg = "STANDARD";
  } else if (dollar === 50) {
    stars = 1200;
    diamonds = 24;
    pkg = "PREMIUM";
  }

  try {
    // assigning package amount
    const reward = await Earning.findOneAndUpdate(
      { userid },
      {
        $inc: { "purchased.stars": stars, "purchased.diamonds": diamonds },
      },
      { new: true }
    );

    // storing data
    const packageDetails = new Payment({
      trxid: transactionid,
      userid: userid,
      amount: dollar,
      package: pkg,
      stars: stars,
      diamonds: diamonds,
      note: "paid by user"
    });
    const paymentResponse = await packageDetails.save();

    console.log("paymentResponse: ", paymentResponse);
    console.log("purchased: ", reward);
  } catch (error) {
    console.log("Fulfilling order: ", error.message);
  }

  // console.log("Fulfilling order: ", session);
};

// managing all transactions with stripe
async function webhook(req, res) {
  const payload = req.body;
  const payloadString = JSON.stringify(payload, null, 2);
  // generating headers
  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endPointSecret,
  });

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      endPointSecret
    );
    console.log("event: ", event);
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    return res.status(400).json(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    let session = event.data.object;

    // Fulfill the purchase...
    console.log("event: ", event);
    fulfillOrder(session);
  }

  // console.log("payload: ", payload);
  res.status(200).end();
}

async function successfullPayment(req, res) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 500,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    res.send({ message: error.message });
  }
}
// TODO: have to set it up for diamond purchase
async function diamond(req, res) {

  try {
    const { diamond } = req.body;

    const discordUser = req.cookies.DiscordUser;
    const userCookie = jwt.verify(discordUser, process.env.API_TOKEN);

    const session = await stripe.checkout.sessions.create({
      client_reference_id: userCookie.userid,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Diamond",
            },
            unit_amount: 150,
          },
          quantity: diamond,
        },
      ],
      mode: "payment",
      success_url: `${cb}/checkout?type=diamond&success=${diamond}`,
      cancel_url: `${cb}/checkout?canceled=${diamond}`,
    });

    res.redirect(303, session.url);

    // const { diamonds, amount } = req.body;
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: amount * 100,
    //   currency: "usd",
    //   automatic_payment_methods: { enabled: true },
    // });

    // res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    res.send({ message: error.message });
  }
}

async function paymentAfterPack(req, res){
  const pkg_id = req.query.pkg_id;
 
  let pkg = "";
  let stars = 0;
  let diamonds = 0;
  let dollar = 0;
  if (pkg_id === "price_1KszAlEu7GyFTKQhdE3bM7on") {
    stars = 100;
    diamonds = 2;
    dollar = 5;
    pkg = "BASIC";
  } else if (pkg_id === "price_1KszCqEu7GyFTKQh9uDgekrg") {
    stars = 550;
    diamonds = 11;
    dollar = 25;
    pkg = "STANDARD";
  } else if (pkg_id === "price_1KszDsEu7GyFTKQhIlVmh4IQ") {
    stars = 1200;
    diamonds = 24;
    dollar = 50;
    pkg = "PREMIUM";
  }

  const discordUser = req.cookies.DiscordUser;
  const userCookie = jwt.verify(discordUser, process.env.API_TOKEN);

  try {
    // assigning package amount
    const reward = await Earning.findOneAndUpdate(
      { userid: userCookie.userid },
      {
        $inc: { "purchased.stars": stars, "purchased.diamonds": diamonds },
      },
      { new: true }
    );

    // storing data
    const packageDetails = new Payment({
      trxid: pkg,
      userid: userCookie.userid,
      amount: dollar,
      package: pkg,
      stars: stars,
      diamonds: diamonds,
      note: "paid by user"
    });
    const paymentResponse = await packageDetails.save();

  } catch (error) {
    console.log("Package Puchase: ", error.message);
  }
}

async function  paymentAfterDiamond(req, res){
 
  const count =  req.query.count;

  const discordUser = req.cookies.DiscordUser;
  const userCookie = jwt.verify(discordUser, process.env.API_TOKEN);

  try {
    // assigning package amount
    const reward = await Earning.findOneAndUpdate(
      { userid: userCookie.userid },
      {
        $inc: { "purchased.diamonds": count },
      },
      { new: true }
    );

    // storing data
    const packageDetails = new Payment({
      trxid: "Diamond",
      userid: userCookie.userid,
      amount: count * 1.5,
      package: "Diamond",
      stars: 0,
      diamonds: count,
      note: "paid by user"
    });
    const paymentResponse = await packageDetails.save();

  } catch (error) {
    console.log("Diamond Puchase: ", error.message);
  }
}
// async function diamond(req, res) {
//   try {
//     const { diamonds, amount } = req.body;
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount * 100,
//       currency: "usd",
//       automatic_payment_methods: { enabled: true },
//     });

//     res.json({ client_secret: paymentIntent.client_secret });
//   } catch (error) {
//     res.send({ message: error.message });
//   }
// }

async function getPaymentHistory(req, res){
  try {
    const discordUser = await req.cookies.DiscordUser;
    const data = jwt.verify(discordUser, process.env.API_TOKEN);

    const result = await Payment.find({
      userid: data.userid
    }).sort({ trx_time: -1 });

    res.status(200).send(result);

  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

const PaymentController = {
  checkoutSession,
  config,
  successfullPayment,
  diamond,
  webhook,
  getPaymentHistory,
  paymentAfterPack,
  paymentAfterDiamond
};

export default PaymentController;
