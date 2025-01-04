import express, { Router } from "express";
import productControllers from "../controllers/product.controllers";
import userMiddlewares from "../middlewares/user.middlewares";
import upload from "../middlewares/multer.middlewares";
import errorHandler from "../services/errorHandler";
const router: Router = express.Router();



router.route('/').get(errorHandler(productControllers.getProducts)).post(userMiddlewares.isUserLoggin, userMiddlewares.isAdmin, upload.single('image'), errorHandler(productControllers.addProduct));
router.route('/:id').get(errorHandler(productControllers.getSingleProducts)).patch(userMiddlewares.isUserLoggin, userMiddlewares.isAdmin, upload.single('image'), errorHandler(productControllers.updateProduct)).delete(userMiddlewares.isUserLoggin, userMiddlewares.isAdmin, errorHandler(productControllers.deleteProducts));




export default router;