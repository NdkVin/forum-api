const Joi = require('joi');
const JoiLoginValidator = require('../JoiLoginValidator');

describe('JoiLoginValidator', () => {
  it('should throw Invariant error when send incomplete payload', () => {
    const payload = {
      username: 'andika',
    };

    const joiLoginValidator = new JoiLoginValidator(Joi);

    expect(() => joiLoginValidator.validate(payload)).toThrowError('password harus diisi');
  });

  it('should return an error if sending a payload with the wrong data type', () => {
    const payload = {
      username: 'andika',
      password: true,
    };

    const joiLoginValidator = new JoiLoginValidator(Joi);

    expect(() => joiLoginValidator.validate(payload)).toThrowError('password harus berupa string');
  });

  it('should throw Invariant error when send username too long', () => {
    const payload = {
      username: 'andikaandikaandikaandikaandikaandikaandikaandikaandikaandikaandikaandika',
      password: 'andika',
    };

    const joiLoginValidator = new JoiLoginValidator(Joi);

    expect(() => joiLoginValidator.validate(payload)).toThrowError('username berisi maksimal 50 karakter');
  });

  it('should throw Invariant error when send username contain restrict character', () => {
    const payload = {
      username: 'andi ka',
      password: 'andika',
    };

    const joiLoginValidator = new JoiLoginValidator(Joi);

    expect(() => joiLoginValidator.validate(payload)).toThrowError('tidak dapat melakukan login karena username mengandung karakter terlarang');
  });

  it('should not throw error', () => {
    const payload = {
      username: 'andika',
      password: 'andika',
    };

    const joiLoginValidator = new JoiLoginValidator(Joi);

    expect(() => joiLoginValidator.validate(payload)).not.toThrowError();
  });
});
