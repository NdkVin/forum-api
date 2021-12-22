const RefreshAccessTokenValidator = require('../../validator/RefreshAccessTokenValidator');
const AuthsRepository = require('../../../Domains/auths/AuthsRepository');
const TokenManager = require('../../security/TokenManager');
const RefreshAccessTokenUseCase = require('../RefreshAccessTokenUseCase');

describe('RefreshAccessTokenUseCase', () => {
  it('should orchesting the login action correctly', async () => {
    const payload = {
      refreshToken: 'refreshToken',
    };

    const expectTokenManager = {
      username: 'andika',
      id: 'user-123',
    };

    const mockRefreshAccessTokenValidator = new RefreshAccessTokenValidator();
    const mockTokenManager = new TokenManager();
    const mockAuthsRepository = new AuthsRepository();

    mockRefreshAccessTokenValidator.validate = jest.fn()
      .mockImplementation(() => Promise.resolve);
    mockAuthsRepository.checkRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve);
    mockTokenManager.verifyRefreshToken = jest.fn()
      .mockImplementation(() => expectTokenManager);

    const refreshAccessTokenUseCase = new RefreshAccessTokenUseCase({
      validator: mockRefreshAccessTokenValidator,
      tokenManager: mockTokenManager,
    });

    refreshAccessTokenUseCase.execute(payload);

    expect(mockRefreshAccessTokenValidator.validate).toBeCalledWith(payload);
    expect(mockTokenManager.verifyRefreshToken).toBeCalledWith(payload);
  });
});
