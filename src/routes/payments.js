import express from "express";
import paypal from "paypal-rest-sdk";
import Book from "../models/Book.js";

const router = express.Router();

paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});

router.post("/paypal/:bookId", async (req, res) => {
  const book = await Book.findById(req.params.bookId);
  const create_payment_json = {
    intent: "sale",
    payer: { payment_method: "paypal" },
    redirect_urls: {
      return_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel"
    },
    transactions: [{
      item_list: { items: [{ name: book.title.English, sku: "001", price: book.price, currency: "USD", quantity: 1 }] },
      amount: { currency: "USD", total: book.price },
      description: `Purchase of ${book.title.English}`
    }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) return res.status(500).json({ error });
    const approvalUrl = payment.links.find(link => link.rel === "approval_url").href;
    res.json({ approvalUrl });
  });
});

export default router;
