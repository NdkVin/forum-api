const TokenManager = require('../TokenManager');

describe('TokenManager', () => {
  it('should throw error when directly call token manager method', () => {
    const tokenManager = new TokenManager();

    expect(() => tokenManager.generateAccessToken({})).toThrowError('TOKEN_MANAGER_METHOD.NOT_IMPEMENTED');
    expect(() => tokenManager.generateRefreshToken({})).toThrowError('TOKEN_MANAGER_METHOD.NOT_IMPEMENTED');
    expect(() => tokenManager.verifyRefreshToken()).toThrowError('TOKEN_MANAGER_METHOD.NOT_IMPEMENTED');
  });
});
