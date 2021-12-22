const RefreshAccessTokenValidator = require('../../validator/RefreshAccessTokenValidator');
const AutsRepository = require('../../../Domains/auths/AuthsRepository');
const LogoutUseCase = require('../LogoutUseCase');

describe('LogoutUseCase', () => {
  it('should orchesting the logout action correctly', async () => {
    const LogoutPayload = {
      refreshToken: 'refreshToken',
    };

    const mockRefreshAccessTokenValidator = new RefreshAccessTokenValidator();
    const mockAuthsRepository = new AutsRepository();

    mockRefreshAccessTokenValidator.validate = jest.fn()
      .mockImplementation(() => Promise.resolve);
    mockAuthsRepository.checkDelete = jest.fn()
      .mockImplementation(() => Promise.resolve);
    mockAuthsRepository.deleteToken = jest.fn()
      .mockImplementation(() => Promise.resolve);

    const logoutUseCase = new LogoutUseCase({
      validator: mockRefreshAccessTokenValidator,
      authsRepository: mockAuthsRepository,
    });

    await logoutUseCase.execute(LogoutPayload);

    expect(mockRefreshAccessTokenValidator.validate).toBeCalledWith(LogoutPayload);
    expect(mockAuthsRepository.checkDelete).toBeCalledWith(LogoutPayload.refreshToken);
    expect(mockAuthsRepository.deleteToken).toBeCalledWith(LogoutPayload.refreshToken);
  });
});
