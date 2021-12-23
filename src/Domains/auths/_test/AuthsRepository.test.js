const AuthsRepository = require('../AuthsRepository');

describe('AutehnticationRepository', () => {
  it('should throw error when directly call authentication respository method', async () => {
    const authsRepository = new AuthsRepository();

    await expect(authsRepository.addToken('asd')).rejects.toThrowError('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENT');
    await expect(authsRepository.checkRefreshToken('asd')).rejects.toThrowError('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENT');
    await expect(authsRepository.checkDelete('asd')).rejects.toThrowError('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENT');
    await expect(authsRepository.deleteToken('asd')).rejects.toThrowError('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENT');
  });
});
