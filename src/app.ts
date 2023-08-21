import express from 'express';
import productRouter from './routers/product.router';
import loginRouter from './routers/login.router';
// import authMiddleware from './middlewares/login';
import orderRouter from './routers/order.router';

const app = express();

app.use(express.json());

app.use(loginRouter);
// app.use(authMiddleware);
app.use(productRouter);
app.use(orderRouter);

export default app;
