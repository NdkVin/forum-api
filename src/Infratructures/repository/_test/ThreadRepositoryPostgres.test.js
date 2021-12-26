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

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      await threadRepositoryPostgres.addThread(payload, owner);

      const result = ThreadsTableHelpers.getThreadById('thread-123');

      console.log(result);
    });
  });
});
