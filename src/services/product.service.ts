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
  /* Definimos a variável que receberá o valor da resposta do service
  usando o mesmo tipo envelopado na Promise retornada! */
  let responseService: ServiceResponse<Product>;

  const error = validateParams(product);

  /* Se o valor retornado por validateParams for diferente de nulo, 
  o retorno desta função será no formato de erro! */ 
  if (error) {
    responseService = { status: 'INVALID_DATA', data: { message: error } };
    return responseService;
  }

  /* Se o objeto for válido, ele será cadastrado no banco! */
  const newProduct = await ProductModel.create(product);

  return { status: 'CREATED', data: newProduct };
};

export default {
  createProduct,
  listProducts,
};