const TokenManager = require('../../Applications/security/TokenManager');
const InvariantError = require('../../Commons/exceptions/InvariantError');

class JwtTokenManager extends TokenManager {
  constructor(jwt) {
    super();
    this._jwt = jwt;
  }

  generateAccessToken(payload) {
    return this._jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY);
  }

  generateRefreshToken(payload) {
    return this._jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY);
  }

  verifyRefreshToken(refreshToken) {
    try {
      const artifacts = this._jwt.token.decode(refreshToken);
      this._jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY);
      const { payload } = artifacts.decoded;
      return payload;
    } catch (e) {
      console.log(e);
      throw new InvariantError('Refresh token tidak valid');
    }
  }
}

module.exports = JwtTokenManager;
