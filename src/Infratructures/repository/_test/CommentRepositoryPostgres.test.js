const pool = require('../../database/postgres/pool');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');
const ThreadsTableHelpers = require('../../../../test/ThreadsTableHelpers');
const UsersTableHelpers = require('../../../../test/UsersTableTestHelper');
const CommentTableHelpers = require('../../../../test/CommentTableHelpers');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableHelpers.cleanTable();
    await UsersTableHelpers.cleanTable();
    await CommentTableHelpers.cleanTable();
  });

  afterAll(async () => {
    pool.end();
  });

  describe('addComment', () => {
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

  describe('DeleteComment', () => {
    it('should return error when comment not found', async () => {
      await UsersTableHelpers.addUser({});
      await ThreadsTableHelpers.addThread({});

      const comment_id = 'comment-123';
      const thread_id = 'thread-123';
      const fakeIdGenerator = () => '123';

      const commnentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      await expect(() => commnentRepositoryPostgres.deleteComment(thread_id, comment_id))
        .rejects.toThrowError(NotFoundError);
    });
    it('should delete comment', async () => {
      await UsersTableHelpers.addUser({});
      await ThreadsTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});

      const comment_id = 'comment-123';
      const thread_id = 'thread-123';
      const fakeIdGenerator = () => '123';

      const commnentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      await commnentRepositoryPostgres.deleteComment(thread_id, comment_id);

      const result = await CommentTableHelpers.getCommentById(comment_id);

      expect(result).toHaveLength(1);
      expect(result[0].is_delete).toEqual(true);
    });
  });

  describe('CheckCommentOwner', () => {
    it('should throw error when comment owner not match', async () => {
      await UsersTableHelpers.addUser({});
      await ThreadsTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});

      const comment_id = 'comment-123';
      const owner = 'user-321';
      const fakeIdGenerator = () => '123';

      const commnentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      expect(() => commnentRepositoryPostgres.checkCommentOwner(owner, comment_id))
        .rejects.toThrowError(AuthorizationError);
    });
    it('should check comment owner', async () => {
      await UsersTableHelpers.addUser({});
      await ThreadsTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});

      const comment_id = 'comment-123';
      const owner = 'user-123';
      const fakeIdGenerator = () => '123';

      const commnentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      const result = await commnentRepositoryPostgres.checkCommentOwner(owner, comment_id);

      expect(result).toEqual(owner);
    });
  });

  describe('checkCommentByIdAndThreadId', () => {
    it('should throw error when comment not found', async () => {
      await UsersTableHelpers.addUser({});
      await ThreadsTableHelpers.addThread({});

      const comment_id = 'comment-123';
      const thread_id = 'thread-123';
      const fakeIdGenerator = () => '123';

      const commnentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      await expect(() => commnentRepositoryPostgres
        .checkCommentByIdAndThreadId(thread_id, comment_id))
        .rejects.toThrowError(NotFoundError);
    });

    it('should not throw error', async () => {
      await UsersTableHelpers.addUser({});
      await ThreadsTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});

      const comment_id = 'comment-123';
      const thread_id = 'thread-123';
      const fakeIdGenerator = () => '123';

      const commnentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      const result = await commnentRepositoryPostgres
        .checkCommentByIdAndThreadId(thread_id, comment_id);
      expect(result).toHaveLength(1);
    });
  });

  describe('getCommentByThreadId', () => {
    it('should return comment', async () => {
      await UsersTableHelpers.addUser({});
      await ThreadsTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});

      const expectedResult = {
        id: 'comment-123',
        username: 'andika',
        date: '27-12-21',
        content: 'ini content',
        is_delete: false,
      };

      const thread_id = 'thread-123';
      const fakeIdGenerator = () => '123';

      const commnentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      const result = await commnentRepositoryPostgres.getCommentByThreadId(thread_id);

      expect(result[0]).toStrictEqual(expectedResult);
    });
  });
});
