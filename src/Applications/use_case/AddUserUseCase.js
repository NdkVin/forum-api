const RegisterUser = require('../../Domains/users/entities/RegisterUser');

class AddUserUseCase {
  constructor({ userRepository, passwordHash, usersValidator }) {
    this._userRepository = userRepository;
    this._passwordHash = passwordHash;
    this._usersValidator = usersValidator;
  }

  async execute(useCasePayload) {
    this._usersValidator.validate(useCasePayload);
    const registerUser = new RegisterUser(useCasePayload);
    await this._userRepository.verifyAvailableUsername(registerUser.username);
    registerUser.password = await this._passwordHash.hash(registerUser.password);
    return this._userRepository.addUser(registerUser);
  }
}

module.exports = AddUserUseCase;
