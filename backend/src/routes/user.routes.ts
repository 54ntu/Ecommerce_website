import express from "express";

import UserController from "../controllers/user.controllers";
const router = express.Router();


router.route("/register").post(UserController.register);
router.route("/login").post(UserController.login);
router.route("/forgot-password").post(UserController.handleForgotPassword);




export default router;