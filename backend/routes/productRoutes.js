import express from "express";

import productController from "../controller/productController.js";

const router = express.Router();

router.post("/products", productController.create);

export default router;
