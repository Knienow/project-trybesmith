// import OrderModel, { 
//   OrderInputtableTypes,
//   OrderSequelizeModel, 
// } from '../database/models/order.model';
import OrderModel, { 
  OrderSequelizeModel, 
} from '../database/models/order.model';
import sequelize from '../database/models/index';
import ProductModel from '../database/models/product.model';
// import { Order } from '../types/Order';
import { ServiceResponse } from '../types/ServiceResponse';
  
// function validateParams({ userId }: OrderInputtableTypes): string | null {
//   if (!userId) return 'userId is required';
    
//   /* Se o objeto for válido retorna nulo. */
//   return null;
// }
  
const listOrders = async () : Promise<ServiceResponse<OrderSequelizeModel[]>> => {
  const orders = await OrderModel.findAll({
    include: [
      { model: ProductModel, as: 'productsIds', attributes: [] },
    ],
    attributes: [
      'id',
      'userId',
      [sequelize.fn('JSON_ARRAYAGG', sequelize.col('productIds.id')), 'productIds'],
    ],
    group: ['Order.id'],
    raw: true,
  });
  return { status: 'SUCCESSFUL', data: orders };
};
  
// async function createOrder(
//   order: OrderInputtableTypes,
// ): Promise<ServiceResponse<Order>> {
//   let responseService: ServiceResponse<Order>;
//   const error = validateParams(order);
  
//   if (error) {
//     responseService = { status: 'INVALID_DATA', data: { message: error } };
//     return responseService;
//   }
  
//   const newOrder = await OrderModel.create(order);
  
//   responseService = { status: 'SUCCESSFUL', data: newOrder.dataValues };
  
//   return responseService;
// }

export default {
  listOrders,
//   createOrder,
};