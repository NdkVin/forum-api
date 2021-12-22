const Joi = require('joi');
const JoiUsersValidator = require('../JoiUsersValidator');

describe('JoiUsersValidator', () => {
  it('should throw Invariant error when send incomplete payload', () => {
    const payload = {
      username: 'andika',
      password: 'andika',
    };

    const joiUsersValidator = new JoiUsersValidator(Joi);

    expect(() => joiUsersValidator.validate(payload)).toThrowError('fullname harus diisi');
  });

  it('should return an error if sending a payload with the wrong data type', () => {
    const payload = {
      username: 'andika',
      password: 'andika',
      fullname: true,
    };

    const joiUsersValidator = new JoiUsersValidator(Joi);

    expect(() => joiUsersValidator.validate(payload)).toThrowError('fullname harus berupa string');
  });

  it('should throw Invariant error when send username too long', () => {
    const payload = {
      username: 'andikaandikaandikaandikaandikaandikaandikaandikaandikaandikaandikaandika',
      password: 'andika',
      fullname: 'andika',
    };

    const joiUsersValidator = new JoiUsersValidator(Joi);

    expect(() => joiUsersValidator.validate(payload)).toThrowError('username berisi maksimal 50 karakter');
  });

  it('should throw Invariant error when send username contain restrict character', () => {
    const payload = {
      username: 'andi ka',
      password: 'andika',
      fullname: 'andika',
    };

    const joiUsersValidator = new JoiUsersValidator(Joi);

    expect(() => joiUsersValidator.validate(payload)).toThrowError('tidak dapat membuat user baru karena username mengandung karakter terlarang');
  });

  it('should not throw error', () => {
    const payload = {
      username: 'andika',
      password: 'andika',
      fullname: 'andika',
    };

    const joiUsersValidator = new JoiUsersValidator(Joi);

    expect(() => joiUsersValidator.validate(payload)).not.toThrowError();
  });
});
