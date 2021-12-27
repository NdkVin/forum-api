const AddReplyValidator = require('../AddReplyValidator');

describe('AddReplyValidator', () => {
  it('should return error when directly call add replay calidator method', () => {
    const addReplyValidator = new AddReplyValidator();

    expect(() => addReplyValidator.validate({})).toThrowError('ADD_REPLY_VALIDATOR_METHOD.NOT_IMPLEMENTED');
  });
});
