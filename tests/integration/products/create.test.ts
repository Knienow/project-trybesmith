import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import productMock from '../../mocks/product.mock';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });
  
  it('verifica se é possível criar um cadastro de produto com sucesso', async () => {

    const product = productMock.newProduct;

    const response = (await chai.request(app).post('/products').send(product));
    expect(response.status).to.equal(201);
  });
});
