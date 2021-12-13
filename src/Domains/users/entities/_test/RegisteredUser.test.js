const RegisteredUser = require('../RegisteredUser');

describe('RegisteredUser entites', () => {
  it('should return an error if the payload is incomplete', () => {
    const payload = {
      username: 'andika',
      fullname: 'andikaandika',
    };

    expect(() => new RegisteredUser(payload)).toThrowError('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should return an error if the data in the payload does not match', () => {
    const payload = {
      id: 'andika',
      username: 'andikaandika',
      fullname: 123,
    };

    expect(() => new RegisteredUser(payload)).toThrowError('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should return the payload according to the data entered', () => {
    const payload = {
      id: 'andika',
      username: 'andikaandika',
      fullname: '123',
    };

    const { id, username, fullname } = new RegisteredUser(payload);

    expect(id).toEqual(payload.id);
    expect(username).toEqual(payload.username);
    expect(fullname).toEqual(payload.fullname);
  });
});
