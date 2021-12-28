const pool = require('../../database/postgres/pool');
const ReplyTableHelper = require('../../../../test/ReplyTableHelpers');
const ThreadsTableHelpers = require('../../../../test/ThreadsTableHelpers');
const UsersTableHelpers = require('../../../../test/UsersTableTestHelper');
const CommentTableHelpers = require('../../../../test/CommentTableHelpers');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const ReplyRepositoryPostgres = require('../ReplyRepositoryPostgres');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

describe('ReplyRepositoryPostgres', () => {
  afterEach(async () => {
    await ReplyTableHelper.cleanTable();
    await UsersTableHelpers.cleanTable();
    await CommentTableHelpers.cleanTable();
    await ThreadsTableHelpers.cleanTable();
  });

  afterAll(async () => {
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

      const result = await ReplyTableHelper.getReplyById('reply-123');

      expect(result).toHaveLength(1);
      expect(returningValue).toStrictEqual(expectedReturningValues);
    });
  });

  describe('CheckReplyOwner', () => {
    it('should return error when owner not match', async () => {
      await UsersTableHelpers.addUser({});
      await ThreadsTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});
      await ReplyTableHelper.addReply({});

      const owner = 'user-321';
      const replyId = 'reply-123';

      const fakeIdGenerator = () => '123';

      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      await expect(() => replyRepositoryPostgres.checkReplyOwner(replyId, owner))
        .rejects.toThrowError(AuthorizationError);
    });

    it('should not return error when owner match', async () => {
      await UsersTableHelpers.addUser({});
      await ThreadsTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});
      await ReplyTableHelper.addReply({});

      const owner = 'user-123';
      const replyId = 'reply-123';

      const fakeIdGenerator = () => '123';

      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);
      const ownerDb = await replyRepositoryPostgres.checkReplyOwner(replyId, owner);

      expect(ownerDb).toEqual(owner);
    });
  });

  describe('checkReply', () => {
    it('should return error when reply not found', async () => {
      await UsersTableHelpers.addUser({});
      await ThreadsTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});

      const threadId = 'thread-123';
      const commentId = 'comment-123';
      const replyId = 'reply-123';

      const fakeIdGenerator = () => '123';

      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      await expect(() => replyRepositoryPostgres.checkReply(threadId, commentId, replyId))
        .rejects.toThrowError(NotFoundError);
    });

    it('should not return error', async () => {
      await UsersTableHelpers.addUser({});
      await ThreadsTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});
      await ReplyTableHelper.addReply({});

      const threadId = 'thread-123';
      const commentId = 'comment-123';
      const replyId = 'reply-123';

      const fakeIdGenerator = () => '123';

      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      const result = await replyRepositoryPostgres.checkReply(threadId, commentId, replyId);

      expect(result).toHaveLength(1);
      expect(result[0]).toBeDefined();
    });
  });

  describe('deletereply', () => {
    it('should not return error and delete reply', async () => {
      await UsersTableHelpers.addUser({});
      await ThreadsTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});
      await ReplyTableHelper.addReply({});

      const replyId = 'reply-123';

      const fakeIdGenerator = () => '123';

      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      await replyRepositoryPostgres.deleteReply(replyId);

      const result = await ReplyTableHelper.getReplyById(replyId);

      expect(result[0].is_delete).toEqual(true);
    });
  });

  describe('deletereply', () => {
    it('should not return error and delete reply', async () => {
      await UsersTableHelpers.addUser({});
      await ThreadsTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});
      await ReplyTableHelper.addReply({});

      const expectedResult = {
        id: 'reply-123',
        content: 'ini content',
        date: '27-12-21',
        username: 'andika',
        is_delete: false,
        comment_id: 'comment-123',
      };

      const threadId = 'thread-123';
      const commentId = 'comment-123';

      const fakeIdGenerator = () => '123';

      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      const result = await replyRepositoryPostgres
        .getReplyByThreadId(threadId, commentId);

      expect(result[0]).toStrictEqual(expectedResult);
    });
  });
});
