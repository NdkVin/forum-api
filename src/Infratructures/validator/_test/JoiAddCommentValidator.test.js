const Joi = require('joi');
const JoiAddCommentValidator = require('../JoiAddCommentValidator');

describe('JoiAddCommentValidator', () => {
  it('should return error when send empty payload', () => {
    const payload = {};

    const joiAddCommentValidator = new JoiAddCommentValidator(Joi);

    expect(() => joiAddCommentValidator.validate(payload)).toThrowError('content harus diisi');
  });

  it('should return error when send incorrect data type on payload', () => {
    const payload = {
      content: true,
    };

    const joiAddCommentValidator = new JoiAddCommentValidator(Joi);

    expect(() => joiAddCommentValidator.validate(payload)).toThrowError('content harus berupa string');
  });

  it('should return error when send empty content', () => {
    const payload = {
      content: '',
    };

    const joiAddCommentValidator = new JoiAddCommentValidator(Joi);

    expect(() => joiAddCommentValidator.validate(payload)).toThrowError('content tidak boleh kosong');
  });
});
