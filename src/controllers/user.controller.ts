import { Request, Response } from 'express';
import userService from '../services/user.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const user = async (req: Request, res: Response) : Promise<Response> => {
  const serviceResponse = await userService.verifyUser(req.body);

  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);  
  }
  
  return res.status(200).json(serviceResponse.data);
};

export default {
  user,
};