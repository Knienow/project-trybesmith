import { expect } from 'chai';
import sinon from 'sinon';
// import { Model } from 'sequelize';
import UserModel from '../../../src/database/models/user.model';
import loginMock from '../../mocks/login.mock';
import userService from '../../../src/services/user.service';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });

  describe('#verifyUser', function () {
    it('ao não receber um username, retorne um erro', async function () {
      const parameters = loginMock.noUsernameLoginBody;
  
      const serviceResponse = await userService.verifyUser(parameters);
  
      expect(serviceResponse.status).to.eq('INVALID_DATA');
      expect(serviceResponse.data).not.to.have.key('token');
      expect(serviceResponse.data).to.deep.eq({ message: 'Username or password invalid' });  
    });
    
    it('ao não receber uma senha, retorne um erro', async function () {
      const parameters = loginMock.noPasswordLoginBody;
    
      const serviceResponse = await userService.verifyUser(parameters);
    
      expect(serviceResponse.status).to.eq('INVALID_DATA');
      expect(serviceResponse.data).not.to.have.key('token');
      expect(serviceResponse.data).to.deep.eq({ message: 'Username or password invalid' });  
    });

    it('ao receber um username inexistente, retorne um erro', async function () {
      const parameters = loginMock.notExistingUserBody;
      sinon.stub(UserModel, 'findOne').resolves(null);
    
      const serviceResponse = await userService.verifyUser(parameters);

      expect(serviceResponse.status).to.eq('UNAUTHORIZED');
      expect(serviceResponse.data).not.to.have.key('token');
      expect(serviceResponse.data).to.deep.eq({ message: 'Username or password invalid' });  
    });

    it('ao receber um username existente e uma senha errada, retorne um erro', async function () {
      const parameters = loginMock.existingUserWithWrongPasswordBody;
      const userInstance = UserModel.build(loginMock.existingUser);
      const mockFindOneReturn = UserModel.build(loginMock.existingUser);
      sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);
    
      const serviceResponse = await userService.verifyUser(parameters);
    
      expect(serviceResponse.status).to.eq('UNAUTHORIZED');
      expect(serviceResponse.data).not.to.have.key('token');
      expect(serviceResponse.data).to.deep.eq({ message: 'Username or password invalid' });  
    });
  });
});
