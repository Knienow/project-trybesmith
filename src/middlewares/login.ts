import { NextFunction, Request, Response } from 'express';
// import jwtUtil from '../utils/jwt.util';
// import UserModel from '../database/models/user.model';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  //   const { authorization } = req.headers;

  if (!username || !password) {
    return res.status(400).json({ message: '"username" and "password" are required' });
  }
  next();
};

export default authMiddleware;