const pool = require('../../database/postgres/pool');
const UsersTableHelper = require('../../../../test/UsersTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');
const ThreadTableHelpers = require('../../../../test/ThreadsTableHelpers');
const CommentTableHelpers = require('../../../../test/CommentTableHelpers');
const ReplyTableHelper = require('../../../../test/ReplyTableHelpers');

describe('AddThread', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableHelper.cleanTable();
    await ThreadTableHelpers.cleanTable();
    await CommentTableHelpers.cleanTable();
    await ReplyTableHelper.cleanTable();
  });

  describe('AddComment', () => {
    it('should return an error when not send authentications', async () => {
      const addReplyPayload = {
        content: 'ini content',
      };

      await UsersTableHelper.addUser({});
      await ThreadTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-123/comments/comment-123/replies',
        payload: addReplyPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual('Unauthorized');
      expect(responseJson.message).toEqual('Missing authentication');
    });

    it('should return an error when thread not found', async () => {
      const addCommentPayload = {
        content: 'ini content',
      };

      await UsersTableHelper.addUser({});
      await ThreadTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-321/comments/comment-123/replies',
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

    it('should return an error when comment not found', async () => {
      const addCommentPayload = {
        content: 'ini content',
      };

      await UsersTableHelper.addUser({});
      await ThreadTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-123/comments/comment-321/replies',
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
      expect(responseJson.message).toEqual('Comment tidak ditemukan');
    });

    it('should return an error when send empty payload', async () => {
      const addReplyPayload = {};

      await UsersTableHelper.addUser({});
      await ThreadTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-123/comments/comment-123/replies',
        payload: addReplyPayload,
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

    it('should return an error when send payload with incorrect data type', async () => {
      const addReplyPayload = {
        content: true,
      };

      await UsersTableHelper.addUser({});
      await ThreadTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-123/comments/comment-123/replies',
        payload: addReplyPayload,
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

    it('should return an error when send payload with empty content', async () => {
      const addReplyPayload = {
        content: '',
      };

      await UsersTableHelper.addUser({});
      await ThreadTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-123/comments/comment-123/replies',
        payload: addReplyPayload,
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
      expect(responseJson.message).toEqual('content tidak boleh kosong');
    });

    it('should not return an error and add reply', async () => {
      const addReplyPayload = {
        content: 'ini content',
      };

      await UsersTableHelper.addUser({});
      await ThreadTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-123/comments/comment-123/replies',
        payload: addReplyPayload,
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
      expect(responseJson.data).toBeDefined();
      expect(responseJson.data.addedReply.content).toEqual(addReplyPayload.content);
      expect(responseJson.data.addedReply.owner).toEqual('user-123');
    });
  });
});
