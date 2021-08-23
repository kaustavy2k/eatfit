const food = require("../models/food");
const orders = require("../models/order");
const stripe = require("stripe")(
  "sk_test_51JISvASGTGDeZiN2lrEjvnv8Y8z8dzVYgAvqypudsuORQdIUVZvDkA05VMR9aU35jw5lDQUVzMVRSsEr24MzkmnH00VR1nMvcf"
);
const {v4:uuidv4}=require('uuid')
exports.payment = async (req, res) => {
  try {
    const { final, token, total } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const idempotencyKey = uuidv4();
    const charge = await stripe.charges.create(
      {
        amount: total * 84,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased Food`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotencyKey,
      }
    );
    let f = {};
    final.forEach((i) => {
      f[i.item] = i.quantity+" x "+i.cost+" - "+i.quantity*i.cost;
    });
    data = {
      emailid: token.email,
      price: total,
      food: f,
    };
    await orders.create(data);
    return res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log("e", err);
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};

exports.getOrder = async (req, res) => {
    try {
      const order = await orders.find({emailid:req.user.email});
      if (order.length !== 0) {
        res.status(200).json({
          message: "your food",
          food: order,
        });
      } else {
        res.status(200).json({
          message: "your food",
          food: [],
          bookedmsg:"No Orders Available"
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: "failure",
        message: err,
      });
    }
  };
