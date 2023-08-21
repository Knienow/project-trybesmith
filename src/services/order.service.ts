import OrderModel, { 
  OrderSequelizeModel, 
} from '../database/models/order.model';
import sequelize from '../database/models/index';
import ProductModel from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';
  
const listOrders = async () : Promise<ServiceResponse<OrderSequelizeModel[]>> => {
  const orders = await OrderModel.findAll({
    include: [
      { model: ProductModel, as: 'productIds', attributes: [] },
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
  
export default {
  listOrders,
};