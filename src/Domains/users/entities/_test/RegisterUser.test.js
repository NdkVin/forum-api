const RegisterUser = require('../RegisterUser');

describe('RegisterUser entites', () => {
  it('should return an error if the payload is incomplete', () => {
    const payload = {
      username: 'andika',
      password: 'andikaandika',
    };

    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should return an error if the data in the payload does not match', () => {
    const payload = {
      username: 'andika',
      password: 'andikaandika',
      fullname: 123,
    };

    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should return an error if the username exceeds 50 characters', () => {
    const payload = {
      username: 'andikaandikaandikaandikaandikaandikaandikaandikaandikaandikaandikaandika',
      password: 'andikaandika',
      fullname: '123',
    };

    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.USERNAME_LIMIT_CHAR');
  });

  it('should produce an error if the username contains characters that are not allowed', () => {
    const payload = {
      username: 'andiasd ka',
      password: 'andikaandika',
      fullname: '123',
    };

    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
  });

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
