import { Request, Response } from 'express';
import productService from '../services/product.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const listProducts = async (req: Request, res: Response) : Promise<Response> => {
  const serviceResponse = await productService.listProducts();

  // if (serviceResponse.status !== 'SUCCESSFUL') {
  //   return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);  
  // }
  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);  

  // return res.status(200).json(serviceResponse.data);
};

const createProduct = async (req: Request, res: Response) : Promise<Response> => {
  const { name, price, orderId } = req.body;
  const serviceResponse = await productService.createProduct({ name, price, orderId });
  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);  
  }

  return res.status(201).json(serviceResponse.data);
};

export default {
  createProduct,
  listProducts,
};