class LogoutUseCase {
  constructor({
    validator,
    authsRepository,
  }) {
    this._validator = validator;
    this._authsRepository = authsRepository;
  }

  async execute(payload) {
    this._validator.validate(payload);
    await this._authsRepository.checkRefreshToken(payload.refreshToken);
    await this._authsRepository.deleteToken(payload.refreshToken);
  }
}

module.exports = LogoutUseCase;
