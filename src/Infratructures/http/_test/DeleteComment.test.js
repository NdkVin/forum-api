const pool = require('../../database/postgres/pool');
const UsersTableHelper = require('../../../../test/UsersTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');
const ThreadTableHelpers = require('../../../../test/ThreadsTableHelpers');
const CommentTableHelpers = require('../../../../test/CommentTableHelpers');

describe('AddThread', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableHelper.cleanTable();
    await ThreadTableHelpers.cleanTable();
    await CommentTableHelpers.cleanTable();
  });

  describe('AddComment', () => {
    it('should return an error when not send authorization', async () => {
      const server = await createServer(container);

      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-123/comments/comment-123',
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual('Unauthorized');
      expect(responseJson.message).toEqual('Missing authentication');
    });

    it('should return an error when comment not found', async () => {
      await UsersTableHelper.addUser({});
      await ThreadTableHelpers.addThread({});

      const server = await createServer(container);

      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-123/comments/comment-123',
        auth: {
          strategy: 'forumapi_api',
          credentials: {
            id: 'user-123',
          },
        },
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Comment tidak ditemukan');
    });
  });

  it('should return an error when trying to delete another user comment', async () => {
    await UsersTableHelper.addUser({});
    await ThreadTableHelpers.addThread({});
    await CommentTableHelpers.addComment({});

    const server = await createServer(container);

    const response = await server.inject({
      method: 'DELETE',
      url: '/threads/thread-123/comments/comment-123',
      auth: {
        strategy: 'forumapi_api',
        credentials: {
          id: 'user-321',
        },
      },
    });
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(403);
    expect(responseJson.status).toEqual('fail');
    expect(responseJson.message).toEqual('Anda tidak memiliki hak untuk menghapus ini');
  });

  it('should not return and delete comment', async () => {
    await UsersTableHelper.addUser({});
    await ThreadTableHelpers.addThread({});
    await CommentTableHelpers.addComment({});

    const server = await createServer(container);

    const response = await server.inject({
      method: 'DELETE',
      url: '/threads/thread-123/comments/comment-123',
      auth: {
        strategy: 'forumapi_api',
        credentials: {
          id: 'user-123',
        },
      },
    });
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(200);
    expect(responseJson.status).toEqual('success');
  });
});
