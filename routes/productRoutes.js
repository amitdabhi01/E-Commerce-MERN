import express from "express";

import productController from "../controller/productController.js";

import validate from "../middlewares/Validate.js";
import { createProductSchema } from "../validators/productValidator.js";

import auth from "../middlewares/Auth.js";
import checkRole from "../middlewares/checkRole.js";

const router = express.Router();

router.post(
  "/add",
  validate(createProductSchema),
  auth,
  checkRole("admin"),
  productController.add,
);

export default router;
