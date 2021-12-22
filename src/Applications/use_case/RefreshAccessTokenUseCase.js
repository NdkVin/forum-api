class RefreshAccessTokenUseCase {
  constructor({
    validator,
    tokenManager,
  }) {
    this._validator = validator;
    this._tokenManager = tokenManager;
  }

  async execute(payload) {
    this._validator.validate(payload);
    const { username, id } = this._tokenManager.verifyRefreshToken(payload);
  }
}

module.exports = RefreshAccessTokenUseCase;
