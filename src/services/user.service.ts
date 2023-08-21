import bcrypt from 'bcryptjs';
import jwtUtil from '../utils/jwt.util';
import { ServiceResponse } from '../types/ServiceResponse';
import UserModel, { UserSequelizeModel } from '../database/models/user.model';
// import { User } from '../types/User';
import { Login } from '../types/Login';

const verifyUser = async (user: Login) : Promise<ServiceResponse<UserSequelizeModel>> => {
  if (!user.username || !user.password) {
    return { status: 'INVALID_DATA', data: { message: 'Username or password invalid' } };
  }
  const foundUser = await UserModel.findOne({ where: { username: user.username } });
  
  if (!foundUser || !bcrypt.compareSync(user.password, foundUser.dataValues.password)) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  const { id, username } = foundUser.dataValues;

  const token = jwtUtil.sign({ id, username });

  return { status: 'SUCCESSFUL', data: { token } };
};

export default {
  verifyUser,
};
