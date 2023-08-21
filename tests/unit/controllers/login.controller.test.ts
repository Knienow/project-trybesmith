import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import UserService from '../../../src/services/user.service';
import UserController from '../../../src/controllers/user.controller';
import loginMock from '../../mocks/login.mock';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import { Token } from '../../../src/types/Token';
import userController from '../../../src/controllers/user.controller';
import userService from '../../../src/services/user.service';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;
  const messageUsernameOrPasswordEmpty = '"username" and "password" are required';
  // const messageUsernameOrPasswordInvalid = 'Username or password invalid';
  
  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  
  describe('#login', function () {
    it('ao não receber um username, retorne um erro', async function () {
      req.body = loginMock.noUsernameLoginBody;

      const serviceResponse: ServiceResponse<Token> = {
        status: 'INVALID_DATA',
        data: { message: messageUsernameOrPasswordEmpty },
      }
      sinon.stub(UserService, 'verifyUser').resolves(serviceResponse);
    
      await userController.user(req, res);
      
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: messageUsernameOrPasswordEmpty });
    });

    it('ao receber um username e uma senha válida, retorne um token de login', async function () {
      req.body = loginMock.validLoginBody;
      /* O serviço retorna uma token bcrypt válida. 
      Nesse teste unitário, tanto faz qual valor ela terá, contanto que 
      o controller retorne exatamente o que recebeu, por isso 
      colocamos qualquer coisa como valor. */
      const token = { token: 'm1nh4t0k3nbcr1p7v4l1d4' }
      const serviceResponse: ServiceResponse<Token> = {
        status: 'SUCCESSFUL',
        data: token,
      }
      sinon.stub(userService, 'verifyUser').resolves(serviceResponse);
      
      await userController.user(req, res);
      
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(token);
    });
  });
});
