import express, { Router } from 'express';
import CategoryController from '../controllers/category.controller';
import userMiddlewares from '../middlewares/user.middlewares';
import errorHandler from '../services/errorHandler';
const router: Router = express.Router();


router.route("/").get(errorHandler(CategoryController.getCategories)).post(userMiddlewares.isUserLoggin, userMiddlewares.isAdmin, errorHandler(CategoryController.addCategory));
router.route("/:id").patch(userMiddlewares.isUserLoggin, userMiddlewares.isAdmin, errorHandler(CategoryController.updateCategory)).delete(userMiddlewares.isUserLoggin, userMiddlewares.isAdmin, errorHandler(CategoryController.deleteCategory));


export default router;