const bcrypt = require('bcrypt');
const BcryptPasswordHash = require('../BcryptPasswordHash');
const AuthenticationError = require('../../../Commons/exceptions/AuthenticationError');

describe('BcryptPasswordHash', () => {
  describe('hash password', () => {
    it('should return hased password correctly', async () => {
      const spyHash = jest.spyOn(bcrypt, 'hash');

      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);

      const hasedPassword = await bcryptPasswordHash.hash('plain_password');

      expect(typeof hasedPassword).toEqual('string');
      expect(hasedPassword).not.toEqual('plain_password');
      expect(spyHash).toBeCalledWith('plain_password', 10);
    });
  });

  describe('compare passowrd', () => {
    it('should return authentication error when password not match', async () => {
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);

      await expect(bcryptPasswordHash.compare('plain', 'encrypted')).rejects.toThrowError(AuthenticationError);
    });

    it('should not throw error when password match', async () => {
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);

      const plainPassword = 'password';
      const encryptedPassword = await bcryptPasswordHash.hash(plainPassword);

      await expect(bcryptPasswordHash.compare(plainPassword, encryptedPassword))
        .resolves
        .not
        .toThrowError(AuthenticationError);
    });
  });
});
