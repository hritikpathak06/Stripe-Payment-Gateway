const Order = require("../models/orderModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// exports.createOrder = async (req, res) => {
//     let cart = []
//   const line_items = req.body.cart.map((item) => {
//     return {
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: item.price,
//       },
//       quantity: 1,
//     };
//   });
//   const session = await stripe.checkout.sessions.create({
//     // line_items: [
//     //   {
//     //      price_data:{
//     //         currency:"inr",
//     //         product_data:{
//     //             name:"T-shirt"
//     //         },
//     //         unit_amount:2000,
//     //      },
//     //      quantity:1
//     //   },
//     // ],
//     line_items,
//     mode: "payment",
//     success_url: `http://localhost:3000/?success=true`,
//     cancel_url: `http://localhost:3000/?canceled=true`,
//   });

//   //   res.redirect(303, session.url);
//   res.status(200).json({ url: session.url });
// };

// exports.createPayment = async (req, res) => {
//     try {
//         if (!Array.isArray(req.body.cart)) {
//             throw new Error("Cart data is not an array");
//         }

//         const line_items = req.body.cart.map((item) => {
//             return {
//                 price_data: {
//                     currency: "inr",
//                     product_data: {
//                         name: item.name,
//                     },
//                     unit_amount: item.price,
//                 },
//                 quantity: 1,
//             };
//         });

//         const session = await stripe.checkout.sessions.create({
//             line_items,
//             mode: "payment",
//             success_url: `http://localhost:3000/?success=true`,
//             cancel_url: `http://localhost:3000/?canceled=true`,
//         });

//         res.status(200).json({ url: session.url });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

exports.createPayment = async (req, res) => {
  try {
    // if (!Array.isArray(req.body.cart)) {
    //   throw new Error("Cart data is not an array");
    // }

    // const line_items = req.body.cart.map((item) => {
    //     return {
    //         price_data: {
    //             currency: "inr",
    //             product_data: {
    //                 name: item.name || ,
    //             },
    //             unit_amount: item.price*100,
    //         },
    //         quantity: 1,
    //     };
    // });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "rohiy",
            },
            unit_amount: 10000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/?success=true`,
      cancel_url: `http://localhost:3000/?canceled=true`,
    });

    // After creating the Stripe Checkout session, create an order
    const order = await createOrder(req.body.cart);

    res.status(200).json({ url: session.url}); // Return session URL and order ID
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to create an order
// const createOrder = async (cart) => {
//   try {
//     // Create a new order object
//     const newOrder = new Order({
//       products: cart.map((item) => item._id),
//       quantity: cart.length,
//       totalPrice: cart.reduce((total, item) => total + item.price, 0),
//       paymentId: "Test", // Replace with actual payment ID (if available)
//     });

//     // Save the order to the database
//     const savedOrder = await newOrder.save();

//     // Return the saved order object
//     return savedOrder;
//   } catch (error) {
//     // Handle any errors
//     console.error("Error creating order:", error);
//     throw error;
//   }
// };


exports.createOrderSuccess = async (req, res) => {
    try {
      // Retrieve the cart data from the request body
      const cart = req.body.cart;
  
      // Create the order based on the cart data
      const order = await createOrder(cart);
  
      res.status(200).json({ message: "Order created successfully", orderId: order._id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find();

  return res.status(200).json(orders);
};
