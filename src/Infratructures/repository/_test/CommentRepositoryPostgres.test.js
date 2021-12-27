const pool = require('../../database/postgres/pool');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');
const ThreadsTableHelpers = require('../../../../test/ThreadsTableHelpers');
const UsersTableHelpers = require('../../../../test/UsersTableTestHelper');
const CommentTableHelpers = require('../../../../test/CommentTableHelpers');

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableHelpers.cleanTable();
    await UsersTableHelpers.cleanTable();
    await CommentTableHelpers.cleanTable();
  });

  afterAll(async () => {
    pool.end();
  });

  describe('CommentRepositoryPostgres', () => {
    it('should add comment', async () => {
      await UsersTableHelpers.addUser({});
      await ThreadsTableHelpers.addThread({});

      const payload = {
        content: 'ini konten',
      };
      const owner = 'user-123';
      const thread_id = 'thread-123';
      const fakeIdGenerator = () => '123';

      const expectedReturningValues = {
        id: 'comment-123',
        content: 'ini konten',
        owner,
      };

      const commnentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      const returningValues = await commnentRepositoryPostgres
        .addComment(payload, owner, thread_id);

      const result = await CommentTableHelpers.getCommentById('comment-123');

      expect(result).toHaveLength(1);
      expect(returningValues).toStrictEqual(expectedReturningValues);
    });
  });
});
