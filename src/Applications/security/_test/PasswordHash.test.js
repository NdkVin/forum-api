const PasswordHash = require('../PasswordHash');

describe('PasswordHash interface', () => {
  it('should return an error when calling a method on an abstract class', async () => {
    const passwordHash = new PasswordHash();

    expect(passwordHash.hash('123')).rejects.toThrowError('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  });
});
