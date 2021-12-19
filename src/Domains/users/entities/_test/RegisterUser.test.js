const RegisterUser = require('../RegisterUser');

describe('RegisterUser entites', () => {
  it('should return the payload according to the data entered', () => {
    const payload = {
      username: 'andika',
      password: 'andikaandika',
      fullname: '123',
    };

    const { username, password, fullname } = new RegisterUser(payload);

    expect(username).toEqual(payload.username);
    expect(password).toEqual(payload.password);
    expect(fullname).toEqual(payload.fullname);
  });
});
