const AuthUser = require('../Auths');

describe('AuthUser', () => {
  it('should return error when send incomplete payload', () => {
    const payload = {
      accessToken: 'asdas',
    };

    expect(() => new AuthUser(payload)).toThrowError('AUTH_USER.NOT_COMPLETE');
  });

  it('should return error when send payload with incorect data type', () => {
    const payload = {
      accessToken: 'asdas',
      refreshToken: 21123,
    };

    expect(() => new AuthUser(payload)).toThrowError('AUTH_USER.NOT_MATCHING_DATA_TYPE');
  });

  it('should return auth user correctly', () => {
    const payload = {
      accessToken: 'asdasd',
      refreshToken: 'qweqeqe',
    };

    const { accessToken, refreshToken } = new AuthUser(payload);

    expect(accessToken).toEqual(payload.accessToken);
    expect(refreshToken).toEqual(payload.refreshToken);
  });
});
