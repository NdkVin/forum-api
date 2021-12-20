const pool = require('../../database/postgres/pool');
const AuthsTableHelpers = require('../../../../test/AuthsTableHelpers');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const AuthsRepositoryPostgres = require('../AuthsRepositoryPostgres');

describe('AuthsRepsoitoryPostgres', () => {
  afterEach(async () => {
    await AuthsTableHelpers.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addToken function', () => {
    it('should add token to database', async () => {
      const authsRepositoryPostgres = new AuthsRepositoryPostgres(pool);

      await authsRepositoryPostgres.addToken('token');

      const tokenFromDB = await AuthsTableHelpers.findToken('token');
      expect(tokenFromDB).toEqual('token');
    });
  });

  describe('checkRefreshToken', () => {
    it('should throw error when check invalid refresh token', async () => {
      const authsRepositoryPostgres = new AuthsRepositoryPostgres(pool);

      expect(authsRepositoryPostgres.checkRefreshToken('token'))
        .rejects
        .toThrowError(InvariantError);
    });

    it('should not throw error', async () => {
      const authsRepositoryPostgres = new AuthsRepositoryPostgres(pool);
      await AuthsTableHelpers.addToken('token');

      expect(authsRepositoryPostgres.checkRefreshToken('token'))
        .resolves
        .not
        .toThrowError(InvariantError);
    });
  });

  describe('deleteToken', () => {
    it('should delete token from database', async () => {
      const authsRepositoryPostgres = new AuthsRepositoryPostgres(pool);
      await AuthsTableHelpers.addToken('token');

      await authsRepositoryPostgres.deleteToken('token');

      expect(() => AuthsTableHelpers.findToken('token')).toHaveLength(0);
    });
  });
});
