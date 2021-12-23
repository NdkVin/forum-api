const AddThreadValidator = require('../AddThreadValidator');

describe('AddThreadValidator', () => {
  it('should return error when directly call add thread validator method', () => {
    const addThreadValidator = new AddThreadValidator();

    expect(() => addThreadValidator.validate({})).toThrowError('LOGIN_VALIDATOR_METHOD.NOT_IMPLEMENTED');
  });
});
