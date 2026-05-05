import express from "express";

import productController from "../controller/productController.js";

import validate from "../middlewares/Validate.js";
import { createProductSchema } from "../validators/productValidator.js";

const router = express.Router();

router.post(
  "/products",
  validate(createProductSchema),
  productController.create,
);

export default router;
