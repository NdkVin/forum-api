const LoginUseCase = require('../../../../Applications/use_case/LoginUseCase');

class AuthsHandler {
  constructor(container) {
    const { authsContainer } = container;

    this._container = authsContainer;

    this.postAuthsHandler = this.postAuthsHandler.bind(this);
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
}

module.exports = AuthsHandler;
