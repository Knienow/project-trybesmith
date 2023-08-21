const validPassword = 'ch4ng3m3';
const noUsernameLoginBody = { username: '', password: validPassword };

const validUsername = 'Hagar';
const noPasswordLoginBody = { username: validUsername, password: '' };

const notExistingUserBody = { username: 'usernamee', password: validPassword };

const existingUserWithWrongPasswordBody = { userame: validUsername, password: 'wrong_password' };
// const existingUser = {
//   id: 1,
//   username: validUsername,
//   password: validPassword,
// };

const validLoginBody = { username: validUsername, password: validPassword };

export default {
  validUsername,
  validPassword,
  noUsernameLoginBody,
  noPasswordLoginBody,
  notExistingUserBody,
  existingUserWithWrongPasswordBody,
  existingUser,
  validLoginBody,
};
