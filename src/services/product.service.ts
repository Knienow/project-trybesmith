import ProductModel, { 
  ProductInputtableTypes,
  ProductSequelizeModel,
} from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

function validateParams({
  name,
  price,
  orderId,
}: ProductInputtableTypes): string | null {
  if (!name) return '"name" is required';
  if (!price) return '"price" is required';
  if (!orderId) return 'orderId is required';

  return null;
}

const listProducts = async () : Promise<ServiceResponse<ProductSequelizeModel[]>> => {
  const products = await ProductModel.findAll();

  return { status: 'SUCCESSFUL', data: products };
};

const createProduct = async (
  product: ProductInputtableTypes,
) : Promise<ServiceResponse<ProductSequelizeModel>> => {
  let responseService: ServiceResponse<Product>;

  const error = validateParams(product);

  if (error) {
    responseService = { status: 'INVALID_DATA', data: { message: error } };
    return responseService;
  }

  const newProduct = await ProductModel.create(product);

  return { status: 'CREATED', data: newProduct };
};

export default {
  createProduct,
  listProducts,
};