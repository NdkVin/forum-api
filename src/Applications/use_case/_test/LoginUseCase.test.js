const LoginValidator = require('../../validator/LoginValidator');
const UserRepository = require('../../../Domains/users/UserRepository');
const PasswordHash = require('../../security/PasswordHash');
const TokenManager = require('../../security/TokenManager');
const Auths = require('../../../Domains/auths/entities/Auths');
const AuthsRepository = require('../../../Domains/auths/AuthsRepository');

const LoginUseCase = require('../LoginUseCase');

describe('LoginUseCase', () => {
  it('should orchesting the login action correctly', async () => {
    const payload = {
      username: 'andika',
      password: 'password',
    };

    const expectedUserRepository = {
      id: 'user-123',
      password: 'encryptedPassword',
    };

    const loggedinRes = new Auths({
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    });
    const mockLoginValidator = new LoginValidator();
    const mockUserRepository = new UserRepository();
    const mockPasswordHash = new PasswordHash();
    const mockTokenManager = new TokenManager();
    const mockAuthsRepository = new AuthsRepository();

    mockLoginValidator.validate = jest.fn()
      .mockImplementation(() => Promise.resolve);
    mockUserRepository.getIdAndPasswordByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedUserRepository));
    mockPasswordHash.compare = jest.fn()
      .mockImplementation(() => Promise.resolve);
    mockTokenManager.generateAccessToken = jest.fn()
      .mockImplementation(() => 'accessToken');
    mockTokenManager.generateRefreshToken = jest.fn()
      .mockImplementation(() => 'refreshToken');
    mockAuthsRepository.addToken = jest.fn()
      .mockImplementation(() => Promise.resolve);

    const loginUseCase = new LoginUseCase({
      validator: mockLoginValidator,
      userRepository: mockUserRepository,
      passwordHash: mockPasswordHash,
      tokenManager: mockTokenManager,
      authsRepository: mockAuthsRepository,
    });

    const loggedinUser = await loginUseCase.execute(payload);
    expect(loggedinUser).toStrictEqual(loggedinRes);
    expect(mockLoginValidator.validate).toBeCalledWith(payload);
    expect(mockUserRepository.getIdAndPasswordByUsername).toBeCalledWith(payload.username);
    expect(mockPasswordHash.compare)
      .toBeCalledWith(payload.password, expectedUserRepository.password);
    expect(mockTokenManager.generateAccessToken)
      .toHaveBeenCalledWith({ username: payload.username, id: expectedUserRepository.id });
    expect(mockTokenManager.generateRefreshToken)
      .toHaveBeenCalledWith({ username: payload.username, id: expectedUserRepository.id });
    expect(mockAuthsRepository.addToken).toBeCalledWith(loggedinRes.refreshToken);
  });
});
