const AuthorizationError = require('../AuthorizationError');

describe('AuthenticationError', () => {
  it('should throw error correctly', () => {
    const authorizationError = new AuthorizationError('an authorization error occurs');

    expect(authorizationError.name).toEqual('AuthorizationError');
    expect(authorizationError.message).toEqual('an authorization error occurs');
    expect(authorizationError.statusCode).toEqual(403);
  });
});
