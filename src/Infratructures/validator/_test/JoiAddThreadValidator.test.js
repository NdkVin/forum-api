const Joi = require('joi');
const JoiAddThreadValidator = require('../JoiAddThreadValidator');

describe('JoiAddThreadValidator', () => {
  it('should throw error when send empty payload', () => {
    const payload = {};

    const joiAddThreadValidator = new JoiAddThreadValidator(Joi);

    expect(() => joiAddThreadValidator.validate(payload)).toThrowError();
  });

  it('should throw error when send incompled payload', () => {
    const payload = {
      title: 'andika',
    };

    const joiAddThreadValidator = new JoiAddThreadValidator(Joi);

    expect(() => joiAddThreadValidator.validate(payload)).toThrowError('body harus diisi');
  });

  it('should throw error when send incorrect data type on payload', () => {
    const payload = {
      title: 'andika',
      body: true,
    };

    const joiAddThreadValidator = new JoiAddThreadValidator(Joi);

    expect(() => joiAddThreadValidator.validate(payload)).toThrowError('body harus berupa string');
  });

  it('should throw error when send empty title payload', () => {
    const payload = {
      title: '',
      body: 'andika',
    };

    const joiAddThreadValidator = new JoiAddThreadValidator(Joi);

    expect(() => joiAddThreadValidator.validate(payload)).toThrowError('title tidak boleh kosong');
  });

  it('should not throw error when send correct payload', () => {
    const payload = {
      title: 'andika',
      body: 'andika',
    };

    const joiAddThreadValidator = new JoiAddThreadValidator(Joi);

    expect(() => joiAddThreadValidator.validate(payload)).not.toThrowError();
  });
});
