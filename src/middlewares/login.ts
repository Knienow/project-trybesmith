// import { NextFunction, Request, Response } from 'express';
// import jwtUtil from '../utils/jwt.util';
// import UserModel from '../database/models/user.model';

// async function authMiddleware(req: Request, res: Response, next: NextFunction) {
//   const { authorization } = req.headers;

//   if (!authorization) {
//     return res.status(401).json({ message: 'Username or password invalid' });
//   }

//   try {
//     const decoded = await jwtUtil.verify(authorization);
//     const user = await UserModel.findOne({ where: { username: decoded.username } });
//     if (!user) return res.status(401).json({ message: 'username" and "password" are required' }); 
//     // return res.status(200).json({ token: authorization });
    
//     next();
//   } catch (e) {
//     return res.status(400).json({ message: '"username" and "password" are required' });
//   }

//   // return res.status(200).json({ authorization });
// }

// export default authMiddleware;
