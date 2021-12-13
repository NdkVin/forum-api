const AuthenticationError = require('../AuthenticationError');

describe('AuthenticationError', () => {
  it('should throw error correctly', () => {
    const authenticationError = new AuthenticationError('an authentication error occurs');

    expect(authenticationError.name).toEqual('AuthenticationError');
    expect(authenticationError.message).toEqual('an authentication error occurs');
    expect(authenticationError.statusCode).toEqual(401);
  });
});
