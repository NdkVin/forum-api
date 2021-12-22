const Joi = require('joi');
const JoiRefreshAccessTokenValidator = require('../JoiRefreshAccessTokenValidator');

describe('JoiRefreshAccessTokenValidator', () => {
  it('should throw error when access token not string', () => {
    const payload = {
      refreshToken: true,
    };

    const joiRefreshAccessTokenValidator = new JoiRefreshAccessTokenValidator(Joi);

    expect(() => joiRefreshAccessTokenValidator.validate(payload)).toThrowError('refresh token harus berupa string');
  });

  it('should throw error when access is empty', () => {
    const payload = {};

    const joiRefreshAccessTokenValidator = new JoiRefreshAccessTokenValidator(Joi);

    expect(() => joiRefreshAccessTokenValidator.validate(payload)).toThrowError('refresh token harus diisi');
  });

  it('should nit throw error', () => {
    const payload = {
      refreshToken: 'somerefreshtoken',
    };

    const joiRefreshAccessTokenValidator = new JoiRefreshAccessTokenValidator(Joi);

    expect(() => joiRefreshAccessTokenValidator.validate(payload)).not.toThrowError();
  });
});
