const Jwt = require('@hapi/jwt');
const JwtTokenManager = require('../JwtTokenManager');

describe('JwtTokenManager', () => {
  describe('GenerateAccessToken', () => {
    it('should create access token correctly', () => {
      const payload = {
        username: 'andika',
        id: 'user-123',
      };

      const jwtTokenManager = new JwtTokenManager(Jwt);
      const spyJwt = jest.spyOn(Jwt.token, 'generate');
      const accessToken = jwtTokenManager.generateAccessToken(payload);

      expect(typeof accessToken).toEqual('string');
      expect(spyJwt).toBeCalledWith(payload, process.env.ACCESS_TOKEN_KEY);
    });
  });

  describe('GenerateRefreshToken', () => {
    it('should create access token correctly', () => {
      const payload = {
        username: 'andika',
        id: 'user-123',
      };

      const jwtTokenManager = new JwtTokenManager(Jwt);
      const spyJwt = jest.spyOn(Jwt.token, 'generate');
      const refreshToken = jwtTokenManager.generateRefreshToken(payload);

      expect(typeof refreshToken).toEqual('string');
      expect(spyJwt).toBeCalledWith(payload, process.env.ACCESS_TOKEN_KEY);
    });
  });

  describe('VerifyRefreshToken', () => {
    it('should throw invariant error when send invalid refresh token', () => {
      const payload = {
        username: 'andika',
        id: 'user-123',
      };
      const jwtTokenManager = new JwtTokenManager(Jwt);
      const accessToken = jwtTokenManager.generateAccessToken(payload);

      expect(() => jwtTokenManager.verifyRefreshToken(accessToken))
        .toThrowError('Refresh token tidak valid');
    });

    it('should return payload correctly', () => {
      const payload = {
        username: 'andika',
        id: 'user-123',
      };
      const jwtTokenManager = new JwtTokenManager(Jwt);
      const refreshToken = jwtTokenManager.generateRefreshToken(payload);

      expect(() => jwtTokenManager.verifyRefreshToken(refreshToken))
        .toStrictEqual(payload);
    });
  });
});
