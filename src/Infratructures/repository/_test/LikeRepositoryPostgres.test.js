const pool = require('../../database/postgres/pool');
const ThreadsTableHelpers = require('../../../../test/ThreadsTableHelpers');
const UsersTableHelpers = require('../../../../test/UsersTableTestHelper');
const CommentTableHelpers = require('../../../../test/CommentTableHelpers');
const LikeTableHelpers = require('../../../../test/LikeTableHelpers');
const LikeRepositoryPostgres = require('../LikeRepositoryPostgres');

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableHelpers.cleanTable();
    await UsersTableHelpers.cleanTable();
    await CommentTableHelpers.cleanTable();
    await LikeTableHelpers.cleanTable();
  });

  afterAll(async () => {
    pool.end();
  });

  describe('checkLike', () => {
    it('should return 0 when user do not like comment', async () => {
      await UsersTableHelpers.addUser({});
      await ThreadsTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});

      const thread_id = 'thread-123';
      const comment_id = 'comment-123';
      const user_id = 'user-123';

      const fakeIdGenerator = () => '123';

      const likeRepositoryPostgres = new LikeRepositoryPostgres(pool, fakeIdGenerator);

      const result = await likeRepositoryPostgres.checkLike(thread_id, comment_id, user_id);

      expect(result).toEqual(0);
    });

    it('should return 1 when user already like comment', async () => {
      await UsersTableHelpers.addUser({});
      await ThreadsTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});
      await LikeTableHelpers.like({});

      const thread_id = 'thread-123';
      const comment_id = 'comment-123';
      const user_id = 'user-123';

      const fakeIdGenerator = () => '123';

      const likeRepositoryPostgres = new LikeRepositoryPostgres(pool, fakeIdGenerator);

      const result = await likeRepositoryPostgres.checkLike(thread_id, comment_id, user_id);

      expect(result).toEqual(1);
    });
  });

  describe('like', () => {
    it('should like comment', async () => {
      await UsersTableHelpers.addUser({});
      await ThreadsTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});

      const thread_id = 'thread-123';
      const comment_id = 'comment-123';
      const user_id = 'user-123';

      const fakeIdGenerator = () => '123';

      const likeRepositoryPostgres = new LikeRepositoryPostgres(pool, fakeIdGenerator);

      await likeRepositoryPostgres.like(thread_id, comment_id, user_id);
      const result = await LikeTableHelpers.checkLike({ thread_id, comment_id, user_id });
      expect(result).toEqual(1);
    });
  });

  describe('unlike', () => {
    it('should unlike', async () => {
      await UsersTableHelpers.addUser({});
      await ThreadsTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});
      await LikeTableHelpers.like({});

      const thread_id = 'thread-123';
      const comment_id = 'comment-123';
      const user_id = 'user-123';

      const fakeIdGenerator = () => '123';

      const likeRepositoryPostgres = new LikeRepositoryPostgres(pool, fakeIdGenerator);

      await likeRepositoryPostgres.unlike(thread_id, comment_id, user_id);

      const result = await LikeTableHelpers.checkLike({ thread_id, comment_id, user_id });
      expect(result).toEqual(0);
    });
  });
});
