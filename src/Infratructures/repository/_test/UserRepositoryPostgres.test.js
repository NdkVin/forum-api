const UsersTableTestHelper = require('../../../../test/UsersTableTestHelper');
const RegisterUser = require('../../../Domains/users/entities/RegisterUser');
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const pool = require('../../database/postgres/pool');
const UserRepositoryPostgres = require('../UserRepositoryPostgres');

describe('UserRepositoryPostgres', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('VerifyAvailableUsername', () => {
    it('should return InvariantError when username not available', async () => {
      await UsersTableTestHelper.addUser({ username: 'andika-123' });

      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      await expect(userRepositoryPostgres.verifyAvailableUsername('andika-123')).rejects.toThrowError(InvariantError);
    });

    it('should not return InvariantError when username available', async () => {
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      await expect(userRepositoryPostgres.verifyAvailableUsername('andika-123')).resolves.not.toThrowError(InvariantError);
    });
  });

  describe('addUser', () => {
    it('should be able to register customers properly', async () => {
      const registerUser = new RegisterUser({
        username: 'andika',
        password: 'password',
        fullname: 'fullname',
      });

      const fakeIdGenerator = () => '123';

      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

      await userRepositoryPostgres.addUser(registerUser);
      const result = await UsersTableTestHelper.findUsersById('user-123');

      expect(result).toHaveLength(1);
    });

    it('it should return registered user correctly', async () => {
      const registerUser = new RegisterUser({
        username: 'andika',
        password: 'password',
        fullname: 'fullname',
      });

      const fakeIdGenerator = () => '123';
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

      const registeredUser = await userRepositoryPostgres.addUser(registerUser);

      expect(registeredUser).toStrictEqual(new RegisteredUser({
        id: 'user-123',
        username: registerUser.username,
        fullname: registerUser.fullname,
      }));
    });
  });
});
