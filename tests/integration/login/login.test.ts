// import sinon from 'sinon';
// import chai, { expect } from 'chai';
// import chaiHttp from 'chai-http';

// import app from '../../../src/app';
// import UserModel from '../../../src/database/models/user.model';

// chai.use(chaiHttp);

// describe('POST /login', function () { 
//   beforeEach(function () { sinon.restore(); });
//   const validUsername = 'Hagar';
//   const validPassword = 'terrível';

//   it('ao não receber um username, retorne um erro', async function () {
//     const httpResponse = await chai.request(app).post('/login').send({
//       username: '', 
//       password: validPassword,
//     });

//     expect(httpResponse.status).to.equal(400);
//     expect(httpResponse.body).to.be.deep.equal({ message: '"username" and "password" are required' });
//   });

//   it('ao não receber uma senha, retorne um erro', async function () {
//     const httpResponse = await chai.request(app).post('/login').send({
//       username: validUsername,
//       password: '', 
//     });

//     expect(httpResponse.status).to.equal(400);
//     expect(httpResponse.body).to.be.deep.equal({ message: '"username" and "password" are required' });
//   });

//   it('ao receber um username inválido retorne um erro', async function () {
//     sinon.stub(UserModel, 'findOne').resolves(null);

//     const httpResponse = await chai.request(app).post('/login').send({ 
//       username: 'usernamee', 
//       password: validPassword,
//     });

//     expect(httpResponse.status).to.equal(401);
//     expect(httpResponse.body).to.be.deep.equal({ message: 'Username or password invalid' });
//   });

//   it('ao receber um username existente e uma senha errada, retorne um erro', async function () {
//     const httpResponse = await chai.request(app).post('/login').send({
//       userame: validUsername, 
//       password: 'wrong_password',
//     });

//     expect(httpResponse.status).to.equal(401);
//     expect(httpResponse.body).to.be.deep.equal({ message: 'Username or password invalid' });
//   });

//   it('ao receber um username e uma senha válida, retorne um token de login', async function () {
//     const httpResponse = await chai.request(app).post('/login').send({
//       username: validUsername,
//       password: validPassword,
//     });

//     expect(httpResponse.status).to.equal(200);
//     expect(httpResponse.body).to.have.key('token');
//   });
// });
