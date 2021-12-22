class RefreshAccessTokenUseCase {
  constructor({
    validator,
    tokenManager,
    authsRepository,
  }) {
    this._validator = validator;
    this._tokenManager = tokenManager;
    this._authsRepository = authsRepository;
  }

  async execute(payload) {
    this._validator.validate(payload);
    const { refreshToken } = payload;
    await this._authsRepository.checkRefreshToken(refreshToken);
    const { username, id } = this._tokenManager.verifyRefreshToken(refreshToken);

    const accessToken = this._tokenManager.generateAccessToken({ username, id });

    return accessToken;
  }
}

module.exports = RefreshAccessTokenUseCase;
