import express from "express";

import productController from "../controller/productController.js";

import validate from "../middlewares/Validate.js";
import { createProductSchema } from "../validators/productValidator.js";

import auth from "../middlewares/Auth.js";
import checkRole from "../middlewares/checkRole.js";
import uploads from "../middlewares/uploads.js";

const router = express.Router();

router.post(
  "/add",
  auth,
  checkRole("admin"),
  uploads.single("imageURL"),
  validate(createProductSchema),
  productController.add,
);

router.get("/getAll", productController.getAll);

router.get("/:id", productController.getById);

router.patch(
  "/update/:id",
  auth,
  checkRole("admin"),
  uploads.single("imageURL"),
  productController.update,
);

router.delete(
  "/delete/:id",
  auth,
  checkRole("admin"),
  productController.remove,
);

export default router;
