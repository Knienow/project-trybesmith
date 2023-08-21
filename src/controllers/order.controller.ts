import { Request, Response } from 'express';
import orderService from '../services/order.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const listOrders = async (_req: Request, res: Response) : Promise<Response> => {
  const serviceResponse = await orderService.listOrders();

  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);  
  }

  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  // return res.status(200).json(serviceResponse.data);
};

// const createOrder = async (req: Request, res: Response) : Promise<Response> => {
//   const { userId } = req.body;
//   const serviceResponse = await orderService.createOrder({ userId });
//   if (serviceResponse.status !== 'SUCCESSFUL') {
//     return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);  
//   }

//   return res.status(201).json(serviceResponse.data);
// };

export default {
  // createOrder,
  listOrders,
};