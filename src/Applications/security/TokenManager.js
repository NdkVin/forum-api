/* eslint-disable no-unused-vars */
class TokenManager {
  generateAccessToken(payload) {
    throw new Error('TOKEN_MANAGER_METHOD.NOT_IMPEMENTED');
  }

  generateRefreshToken(payload) {
    throw new Error('TOKEN_MANAGER_METHOD.NOT_IMPEMENTED');
  }

  verifyRefreshToken(token) {
    throw new Error('TOKEN_MANAGER_METHOD.NOT_IMPEMENTED');
  }
}

module.exports = TokenManager;
