const RegisteredUser = require('../RegisteredUser');

describe('RegisteredUser entites', () => {
  it('should return an error if the payload is incomplete', () => {
    const payload = {
      username: 'andika',
      password: 'andikaandika',
    };

    expect(() => new RegisteredUser(payload)).toThrowError('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should return an error if the data in the payload does not match', () => {
    const payload = {
      username: 'andika',
      password: 'andikaandika',
      fullname: 123,
    };

    expect(() => new RegisteredUser(payload)).toThrowError('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should return the payload according to the data entered', () => {
    const payload = {
      username: 'andika',
      password: 'andikaandika',
      fullname: '123',
    };

    const { username, password, fullname } = new RegisteredUser(payload);

    expect(username).toEqual(payload.username);
    expect(password).toEqual(payload.password);
    expect(fullname).toEqual(payload.fullname);
  });
});
