import express, { Router } from 'express';
import CategoryController from '../controllers/category.controller';
const router: Router = express.Router();


router.route("/").get(CategoryController.getCategories).post(CategoryController.addCategory);
router.route("/:id").patch(CategoryController.updateCategory).delete(CategoryController.deleteCategory);


export default router;