import HttpError from "../middlewares/HttpError.js";

import Product from "../model/Product.js";

const create = async (req, res, next) => {
  try {
    const { title, description, price, category, stock, imageURL, status } =
      req.body;

    if (
      !title ||
      !description ||
      price === undefined ||
      !category ||
      stock === undefined ||
      !imageURL
    ) {
      return next(new HttpError("All fields are required", 400));
    }

    const existingProduct = await Product.findOne({ title });

    if (existingProduct) {
      return next(new HttpError("Product already exist", 400));
    }

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      stock,
      imageURL,
      status,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "New product added successfully",
      data: newProduct,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default { create };
