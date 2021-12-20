const LoginValidator = require('../LoginValidator');

describe('LoginValidator', () => {
  it('should throw error when directly call login validator method', () => {
    const loginValidator = new LoginValidator();

    expect(() => loginValidator.validate({})).toThrowError('LOGIN_VALIDATOR_METHOD.NOT_IMPLEMENTED');
  });
});
