import express, { Router } from 'express';
import CategoryController from '../controllers/category.controller';
import userMiddlewares from '../middlewares/user.middlewares';
const router: Router = express.Router();


router.route("/").get(CategoryController.getCategories).post(userMiddlewares.isUserLoggin, CategoryController.addCategory);
router.route("/:id").patch(CategoryController.updateCategory).delete(CategoryController.deleteCategory);


export default router;