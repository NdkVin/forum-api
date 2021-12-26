const AddCommentValidator = require('../AddCommentValidator');

describe('AddCommentValidator', () => {
  it('should return error when directly call add coment validator method', () => {
    const addCommentValidator = new AddCommentValidator();

    expect(() => addCommentValidator.validate({})).toThrowError('ADD_COMMENT_VALIDATOR_METHOD.NOT_IMPLEMENTED');
  });
});
