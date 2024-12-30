import express from "express";

import UserController from "../controllers/user.controllers";
const router = express.Router();


router.route("/register").post(UserController.register);
router.route("/login").post(UserController.login);
router.route("/forgot-password").post(UserController.handleForgotPassword);
router.route("/verify-otp").post(UserController.verifyOTP);
router.route("/reset-pass").post(UserController.resetPassword);




export default router;