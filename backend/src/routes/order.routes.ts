import express, { Router } from 'express'
import OrderController from '../controllers/order.controllers';
import userMiddlewares from '../middlewares/user.middlewares';
const router: Router = express.Router();

router.route('/').post(userMiddlewares.isUserLoggin, OrderController.createOrder)






export default router;