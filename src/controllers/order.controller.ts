import { Request, Response } from 'express';
import orderService from '../services/order.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const listOrders = async (req: Request, res: Response) : Promise<Response> => {
  const serviceResponse = await orderService.listOrders();

  // if (serviceResponse.status !== 'SUCCESSFUL') {
  //   return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);  
  // }

  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
};

export default {
  listOrders,
};