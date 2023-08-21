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
  if (!name) return 'Name is required';
  if (!price) return 'Price is required';
  if (!orderId) return 'orderId is required';

  return null;
}

const listProducts = async () : Promise<ServiceResponse<ProductSequelizeModel[]>> => {
  const products = await ProductModel.findAll();

  return { status: 'SUCCESSFUL', data: products };
};

const createProduct = async (
  product: ProductInputtableTypes,
) : Promise<ServiceResponse<Product>> => {
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
  const newTransaction = await ProductModel.create(product);

  /* Geramos o objeto que representa que o cadastro foi realizado com sucesso
  e retorna a transação cadastrada! */
  responseService = { status: 'SUCCESSFUL', data: newTransaction.dataValues };

  return responseService;
};

export default {
  createProduct,
  listProducts,
};