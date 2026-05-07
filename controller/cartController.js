import HttpError from "../middlewares/HttpError.js";

const addToCart = async (req, res, next) => {
  try {
    
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default { addToCart };
