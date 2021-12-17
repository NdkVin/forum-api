/* eslint-disable no-unused-vars */
class AuthRepository {
  async addToken(token) {
    throw new Error('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENT');
  }

  async checkRefreshToken(token) {
    throw new Error('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENT');
  }

  async deleteToken(token) {
    throw new Error('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENT');
  }
}

module.exports = AuthRepository;
