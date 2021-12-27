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
    it('should return an error when send empty payload', async () => {
      const addCommentPayload = {};

      await UsersTableHelper.addUser({});
      await ThreadTableHelpers.addThread({});

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-123/comments',
        payload: addCommentPayload,
        auth: {
          strategy: 'forumapi_api',
          credentials: {
            id: 'user-123',
          },
        },
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('content harus diisi');
    });

    it('should return an error when send incorrect data type on payload', async () => {
      const addCommentPayload = {
        content: 123,
      };

      await UsersTableHelper.addUser({});
      await ThreadTableHelpers.addThread({});

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-123/comments',
        payload: addCommentPayload,
        auth: {
          strategy: 'forumapi_api',
          credentials: {
            id: 'user-123',
          },
        },
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('content harus berupa string');
    });

    it('should return an error when send invalid thread id', async () => {
      const addCommentPayload = {
        content: 'ini content',
      };

      await UsersTableHelper.addUser({});

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-123/comments',
        payload: addCommentPayload,
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
      expect(responseJson.message).toEqual('thread tidak ditemukan');
    });

    it('should return an error when not send autehntications', async () => {
      const addCommentPayload = {
        content: 'ini content',
      };

      await UsersTableHelper.addUser({});
      await ThreadTableHelpers.addThread({});

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-123/comments',
        payload: addCommentPayload,
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual('Unauthorized');
      expect(responseJson.message).toEqual('Missing authentication');
    });

    it('should not return error and add comment', async () => {
      const addCommentPayload = {
        content: 'ini contenet',
      };

      await UsersTableHelper.addUser({});
      await ThreadTableHelpers.addThread({});

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-123/comments',
        payload: addCommentPayload,
        auth: {
          strategy: 'forumapi_api',
          credentials: {
            id: 'user-123',
          },
        },
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(typeof responseJson.data).toEqual('object');
      expect(responseJson.data.addedComment.owner).toEqual('user-123');
      expect(responseJson.data.addedComment.content).toEqual(addCommentPayload.content);
    });
  });
});
