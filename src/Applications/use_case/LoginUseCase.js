const Auths = require('../../Domains/auths/entities/Auths');

class LoginUseCase {
  constructor({
    validator, userRepository, passwordHash, tokenManager, authsRepository,
  }) {
    this._validator = validator;
    this._userRepository = userRepository;
    this._passwordHash = passwordHash;
    this._tokenManager = tokenManager;
    this._authsRepository = authsRepository;
  }

  async execute(payload) {
    this._validator.validate(payload);

    const { username, password } = payload;

    const { id, password: encryptedPassword } = await this._userRepository
      .getIdAndPasswordByUsername(username);

    await this._passwordHash.compare(password, encryptedPassword);
    const accessToken = this._tokenManager.generateAccessToken({ username, id });
    const refreshToken = this._tokenManager.generateRefreshToken({ username, id });

    const auths = new Auths({
      accessToken,
      refreshToken,
    });

    this._authsRepository.addToken(auths);

    return auths;
  }
}

module.exports = LoginUseCase;
