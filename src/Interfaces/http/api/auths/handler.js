const LoginUseCase = require('../../../../Applications/use_case/LoginUseCase');
const RefreshAccessTokenUseCase = require('../../../../Applications/use_case/RefreshAccessTokenUseCase');
const LogoutUseCase = require('../../../../Applications/use_case/LogoutUseCase');

class AuthsHandler {
  constructor(container) {
    const { authsContainer } = container;

    this._container = authsContainer;

    this.postAuthsHandler = this.postAuthsHandler.bind(this);
    this.putAuthsHandler = this.putAuthsHandler.bind(this);
    this.deleteAuthsHandler = this.deleteAuthsHandler.bind(this);
  }

  async postAuthsHandler({ payload }, h) {
    const loginUseCase = this._container.getInstance(LoginUseCase.name);

    const { accessToken, refreshToken } = await loginUseCase.execute(payload);

    const response = h.response({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async putAuthsHandler({ payload }) {
    const refreshAccessTokenUseCase = this._container.getInstance(RefreshAccessTokenUseCase.name);

    const accessToken = await refreshAccessTokenUseCase.execute(payload);

    return {
      status: 'success',
      data: {
        accessToken,
      },
    };
  }

  async deleteAuthsHandler({ payload }) {
    const logoutUseCase = this._container.getInstance(LogoutUseCase.name);

    await logoutUseCase.execute(payload);

    return {
      status: 'success',
      message: 'berhasil logout',
    };
  }
}

module.exports = AuthsHandler;
