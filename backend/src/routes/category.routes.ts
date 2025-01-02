import express, { Router } from 'express';
import CategoryController from '../controllers/category.controller';
import userMiddlewares from '../middlewares/user.middlewares';
const router: Router = express.Router();


router.route("/").get(CategoryController.getCategories).post(userMiddlewares.isUserLoggin, userMiddlewares.isAdmin, CategoryController.addCategory);
router.route("/:id").patch(userMiddlewares.isUserLoggin, userMiddlewares.isAdmin, CategoryController.updateCategory).delete(userMiddlewares.isUserLoggin, userMiddlewares.isAdmin, CategoryController.deleteCategory);


export default router;