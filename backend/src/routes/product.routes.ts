import express, { Router } from "express";
import productControllers from "../controllers/product.controllers";
const router: Router = express.Router();



router.route('/').get(productControllers.getProducts).post(productControllers.addProduct);
router.route('/:id').get(productControllers.getSingleProducts).patch(productControllers.updateProduct).delete(productControllers.deleteProducts);




export default router;