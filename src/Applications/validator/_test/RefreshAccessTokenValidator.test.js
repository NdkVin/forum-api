const RefreshAccessTokenValidator = require('../RefreshAccessTokenValidator');

describe('RefreshAccessTokenValidator', () => {
  it('should throw error when directly call RefreshAccessTokenValidator method', () => {
    const refreshAccessTokenValidator = new RefreshAccessTokenValidator();

    expect(() => refreshAccessTokenValidator.validate('RefreshToken')).toThrowError('REFRESH_ACCESS_TOKEN_VALIDATOR_METHOD.NOT_IMPLEMENTED');
  });
});
