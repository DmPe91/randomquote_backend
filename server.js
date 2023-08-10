import express from "express";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import { quoteValidator } from "./validatior/addQuote.js";
import QuoteModel from "./models/Quote.js";

mongoose
  .connect(
    "mongodb+srv://Dmitry:Fgjcnjk1991@cluster0.9ojel40.mongodb.net/posts?retryWrites=true&w=majority"
  )
  .then(() => console.log("mongo ok"))
  .catch((err) => console.log("mongo error", err));

const app = express();

app.use(express.json());
app.use(cors());

app.post("/posts", quoteValidator, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const doc = new QuoteModel({
      text: req.body.text,
      author: req.body.author,
    });
    const quote = await doc.save();
    res.json(quote);
  } catch (error) {
    res.status(500).json({
      message: "Не удалость загрузить цитату",
    });
  }
});

app.get("/quotes", async (req, res) => {
  try {
    const quotes = await QuoteModel.find();
    res.json(quotes);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось получить цитаты",
    });
  }
});

app.listen(1991, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("all OK");
});
