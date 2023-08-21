import { Router } from 'express';
import orderController from '../controllers/order.controller';

const orderRouter = Router();

// orderRouter.post('/orders', orderController.createOrder);
orderRouter.get('/orders', orderController.listOrders);

export default orderRouter;