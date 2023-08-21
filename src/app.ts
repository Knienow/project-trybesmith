import express from 'express';
import productRouter from './routers/product.router';
import userRouter from './routers/user.router';
// import authMiddleware from './middlewares/login';
import orderRouter from './routers/order.router';

const app = express();

app.use(express.json());

app.use(userRouter);
// app.use(authMiddleware);
app.use(productRouter);
app.use(orderRouter);

export default app;
