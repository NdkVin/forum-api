const LoginUser = require('../LoginUser');

describe('LoginUser', () => {
  it('should return data login user', () => {
    const payload = {
      username: 'andika',
      password: 'andika',
    };

    const { username, password } = new LoginUser(payload);

    expect(username).toEqual(payload.username);
    expect(password).toEqual(payload.password);
  });
});
