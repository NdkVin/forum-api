const UsersValidator = require('../UsersValidator');

describe('UsersValidator', () => {
  it('should return error when directly call UsersValidator method', () => {
    const usersValidator = new UsersValidator();

    expect(() => usersValidator.validate({})).toThrowError('USERS_VALIDATOR.NOT_IMPLEMENTED');
  });
});
