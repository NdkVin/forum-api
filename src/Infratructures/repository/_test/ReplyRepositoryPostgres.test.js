const pool = require('../../database/postgres/pool');
const ReplyTableHelper = require('../../../../test/ReplyTableHelpers');
const ThreadsTableHelpers = require('../../../../test/ThreadsTableHelpers');
const UsersTableHelpers = require('../../../../test/UsersTableTestHelper');
const CommentTableHelpers = require('../../../../test/CommentTableHelpers');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const ReplyRepositoryPostgres = require('../ReplyRepositoryPostgres');

describe('ReplyRepositoryPostgres', () => {
  afterEach(async () => {
    await ReplyTableHelper.cleanTable();
    await UsersTableHelpers.cleanTable();
    await CommentTableHelpers.cleanTable();
    await ThreadsTableHelpers.cleanTable();
  });

  afterEach(async () => {
    pool.end();
  });

  describe('Addreply', () => {
    it('should add reply', async () => {
      await UsersTableHelpers.addUser({});
      await ThreadsTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});

      const payload = {
        content: 'ini konten',
      };
      const owner = 'user-123';
      const threadId = 'thread-123';
      const commentId = 'comment-123';
      const fakeIdGenerator = () => '123';

      const expectedReturningValues = {
        id: 'reply-123',
        content: 'ini konten',
        owner,
      };

      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      const returningValue = await replyRepositoryPostgres
        .addReply(payload, threadId, commentId, owner);

      const result = await ReplyTableHelper.getRelyById('reply-123');

      expect(result).toHaveLength(1);
      expect(returningValue).toStrictEqual(expectedReturningValues);
    });
  });
});
