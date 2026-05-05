import express from "express";

import userController from "../controller/userController.js";

import validate from "../middlewares/Validate.js";
import { createUserSchema } from "../validators/userValidator.js";

import auth from "../middlewares/Auth.js";

const router = express.Router();

router.post("/register", validate(createUserSchema), userController.register);

router.post("/login", userController.login);

router.get("/authLogin", auth, userController.authLogin);

export default router;
