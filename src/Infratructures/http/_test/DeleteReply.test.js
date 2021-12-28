const pool = require('../../database/postgres/pool');
const UsersTableHelper = require('../../../../test/UsersTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');
const ThreadTableHelpers = require('../../../../test/ThreadsTableHelpers');
const CommentTableHelpers = require('../../../../test/CommentTableHelpers');
const ReplyTableHelpers = require('../../../../test/ReplyTableHelpers');
const ThreadsTableHelpers = require('../../../../test/ThreadsTableHelpers');

describe('AddThread', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableHelper.cleanTable();
    await ThreadTableHelpers.cleanTable();
    await CommentTableHelpers.cleanTable();
    await ReplyTableHelpers.cleanTable();
  });

  describe('DeleteReply', () => {
    it('should return an error when not send authorization', async () => {
      const server = await createServer(container);

      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-123/comments/comment-123/replies/reply-123',
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual('Unauthorized');
      expect(responseJson.message).toEqual('Missing authentication');
    });

    it('should return an error when not found reply', async () => {
      await UsersTableHelper.addUser({});
      await ThreadsTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});
      await ReplyTableHelpers.addReply([]);

      const server = await createServer(container);

      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-123/comments/comment-123/replies/reply-321',
        auth: {
          strategy: 'forumapi_api',
          credentials: {
            id: 'user-123',
          },
        },
      });
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('reply tidak ditemukan');
    });

    it('should return an error when trying to delete another user reply', async () => {
      await UsersTableHelper.addUser({});
      await ThreadsTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});
      await ReplyTableHelpers.addReply([]);

      const server = await createServer(container);

      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-123/comments/comment-123/replies/reply-123',
        auth: {
          strategy: 'forumapi_api',
          credentials: {
            id: 'user-321',
          },
        },
      });
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('anda tidak berhak menghapus ini');
    });

    it('should not return error and delete reply', async () => {
      await UsersTableHelper.addUser({});
      await ThreadsTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});
      await ReplyTableHelpers.addReply([]);

      const server = await createServer(container);

      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-123/comments/comment-123/replies/reply-123',
        auth: {
          strategy: 'forumapi_api',
          credentials: {
            id: 'user-123',
          },
        },
      });
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.status).toEqual('success');
    });
  });
});
