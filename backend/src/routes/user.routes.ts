import express, { Router } from "express";

import UserController from "../controllers/user.controllers";
import errorHandler from "../services/errorHandler";
const router: Router = express.Router();


router.route("/register").post(errorHandler(UserController.register));
router.route("/login").post(errorHandler(UserController.login));
router.route("/forgot-password").post(errorHandler(UserController.handleForgotPassword));
router.route("/verify-otp").post(errorHandler(UserController.verifyOTP));
router.route("/reset-pass").post(errorHandler(UserController.resetPassword));


export default router;