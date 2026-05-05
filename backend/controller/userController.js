import HttpError from "../middlewares/HttpError.js";
import User from "../model/User.js";

const register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    const newUser = new User({
      name,
      email,
      password,
      phone,
    });

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new HttpError("User already exist", 400));
    }

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);

    if (!user) {
      return next(new HttpError("Invalid email or password", 400));
    }

    const token = await user.generateAuthToken();

    res
      .status(200)
      .json({ success: true, message: "Login Successfully", user, token });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const authLogin = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return next(new HttpError("Unable to login"));
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(new HttpError(error.message, 404));
  }
};

const logout = async (req, res, next) => {
  try {
    const token = req.token;

    req.user.tokens = req.user.tokens.filter((t) => {
      return t.token !== token;
    });

    await req.user.save();

    res
      .status(200)
      .json({ success: true, message: "User logout successfully" });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const logoutAll = async (req, res, next) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    res
      .status(200)
      .json({ success: true, message: "User Logout from all device" });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};



export default { register, login, authLogin, logout, logoutAll };
