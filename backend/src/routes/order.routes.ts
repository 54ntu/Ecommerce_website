import express, { Router } from 'express'
import OrderController from '../controllers/order.controllers';
import userMiddlewares from '../middlewares/user.middlewares';
import errorHandler from '../services/errorHandler';
const router: Router = express.Router();

router.route('/').post(userMiddlewares.isUserLoggin, errorHandler(OrderController.createOrder))






export default router;