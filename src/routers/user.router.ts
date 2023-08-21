import { Router } from 'express';
import userController from '../controllers/user.controller';
import authMiddleware from '../middlewares/login';

const userRouter = Router();

userRouter.post('/login', authMiddleware, userController.user);

export default userRouter;