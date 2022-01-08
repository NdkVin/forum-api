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

  describe('count like', () => {
    it('count like', async () => {
      await UsersTableHelpers.addUser({});
      await UsersTableHelpers.addUser({ id: 'user-31', username: 'aandika' });

      await ThreadsTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});
      await CommentTableHelpers.addComment({ id: 'comment-321' });

      await LikeTableHelpers.like({});
      await LikeTableHelpers.like({ user_id: 'user-31' });
      await LikeTableHelpers.like({ comment_id: 'comment-321' });
      await LikeTableHelpers.like({ comment_id: 'comment-321', user_id: 'user-31' });

      const thread_id = 'thread-123';

      const fakeIdGenerator = () => '123';

      const likeRepositoryPostgres = new LikeRepositoryPostgres(pool, fakeIdGenerator);

      const result = await likeRepositoryPostgres.countLike(thread_id);

      expect(result).toHaveLength(2);
      expect(result[0].count).toEqual('2');
      expect(result[0].comment_id).toEqual('comment-123');
      expect(result[1].count).toEqual('2');
      expect(result[1].comment_id).toEqual('comment-321');
    });
  });
});
