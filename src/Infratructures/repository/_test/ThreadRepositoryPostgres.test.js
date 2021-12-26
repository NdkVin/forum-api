const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const ThreadsTableHelpers = require('../../../../test/ThreadsTableHelpers');
const UsersTableHelpers = require('../../../../test/UsersTableTestHelper');

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
});
