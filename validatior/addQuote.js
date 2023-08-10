import { body } from "express-validator";

export const quoteValidator = [
  body("text").isLength({ min: 10 }),
  body("author").isLength({ min: 5 }),
];
