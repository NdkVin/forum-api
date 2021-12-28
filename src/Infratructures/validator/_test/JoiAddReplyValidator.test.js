const Joi = require('joi');
const JoiAddReplyValidator = require('../JoiAddReplyValidator');

describe('JoiAddCommentValidator', () => {
  it('should return error when send empty payload', () => {
    const payload = {};

    const joiAddreplyValidator = new JoiAddReplyValidator(Joi);

    expect(() => joiAddreplyValidator.validate(payload)).toThrowError('content harus diisi');
  });

  it('should return error when send incorrect data type on payload', () => {
    const payload = {
      content: true,
    };

    const joiAddreplyValidator = new JoiAddReplyValidator(Joi);

    expect(() => joiAddreplyValidator.validate(payload)).toThrowError('content harus berupa string');
  });

  it('should return error when send empty content', () => {
    const payload = {
      content: '',
    };

    const joiAddreplyValidator = new JoiAddReplyValidator(Joi);

    expect(() => joiAddreplyValidator.validate(payload)).toThrowError('content tidak boleh kosong');
  });
});
