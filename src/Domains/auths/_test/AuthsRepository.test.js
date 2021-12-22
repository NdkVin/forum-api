const AuthsRepository = require('../AuthsRepository');

describe('AutehnticationRepository', () => {
  it('should throw error when directly call authentication respository method', () => {
    const authsRepository = new AuthsRepository();

    expect(authsRepository.addToken('asd')).rejects.toThrowError('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENT');
    expect(authsRepository.checkRefreshToken('asd')).rejects.toThrowError('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENT');
    expect(authsRepository.checkDelete('asd')).rejects.toThrowError('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENT');
    expect(authsRepository.deleteToken('asd')).rejects.toThrowError('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENT');
  });
});
