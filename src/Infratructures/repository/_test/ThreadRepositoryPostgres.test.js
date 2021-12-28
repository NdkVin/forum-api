const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const ThreadsTableHelpers = require('../../../../test/ThreadsTableHelpers');
const UsersTableHelpers = require('../../../../test/UsersTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableHelpers.cleanTable();
    await UsersTableHelpers.cleanTable();
  });

  afterAll(async () => {
    pool.end();
  });

  describe('AddThread', () => {
    it('should add thread', async () => {
      await UsersTableHelpers.addUser({});
      const payload = {
        title: 'judul',
        body: 'ini body',
      };
      const owner = 'user-123';
      const fakeIdGenerator = () => '123';

      const expectedReturningValues = {
        id: 'thread-123',
        title: payload.title,
        owner,
      };
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      const returningValues = await threadRepositoryPostgres.addThread(payload, owner);

      const result = await ThreadsTableHelpers.getThreadById('thread-123');

      expect(result).toHaveLength(1);
      expect(returningValues).toStrictEqual(expectedReturningValues);
    });
  });

  describe('checkThreadById', () => {
    it('should get thread', async () => {
      await UsersTableHelpers.addUser({});
      const fakeIdGenerator = () => '123';
      const expectedReturn = {
        id: 'thread-123',
        title: 'ini title',
        body: 'ini body',
        owner: 'user-123',
        date: '27-12-21',
      };

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      await ThreadsTableHelpers.addThread({});

      const result = await threadRepositoryPostgres.checkThreadById('thread-123');

      expect(result).toHaveLength(1);
      expect(result[0]).toStrictEqual(expectedReturn);
    });
  });

  describe('getThreadById', () => {
    it('should throw error when thread not found', async () => {
      await UsersTableHelpers.addUser({});

      const fakeIdGenerator = () => '123';

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      await expect(() => threadRepositoryPostgres.getThreadById('thread-123'))
        .rejects.toThrowError(NotFoundError);
    });

    it('should get thread', async () => {
      await UsersTableHelpers.addUser({});
      await ThreadsTableHelpers.addThread({});

      const expectedResult = {
        id: 'thread-123',
        title: 'ini title',
        body: 'ini body',
        date: '27-12-21',
        username: 'andika',
      };

      const fakeIdGenerator = () => '123';

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      const result = await threadRepositoryPostgres.getThreadById('thread-123');

      expect(result[0]).toStrictEqual(expectedResult);
    });
  });
});
