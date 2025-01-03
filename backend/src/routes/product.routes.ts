import express, { Router } from "express";
import productControllers from "../controllers/product.controllers";
import userMiddlewares from "../middlewares/user.middlewares";
import upload from "../middlewares/multer.middlewares";
const router: Router = express.Router();



router.route('/').get(productControllers.getProducts).post(userMiddlewares.isUserLoggin, userMiddlewares.isAdmin, upload.single('image'), productControllers.addProduct);
router.route('/:id').get(productControllers.getSingleProducts).patch(userMiddlewares.isUserLoggin, userMiddlewares.isAdmin, upload.single('image'), productControllers.updateProduct).delete(userMiddlewares.isUserLoggin, userMiddlewares.isAdmin, productControllers.deleteProducts);




export default router;