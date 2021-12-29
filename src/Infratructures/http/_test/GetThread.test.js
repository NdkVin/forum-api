const pool = require('../../database/postgres/pool');
const UsersTableHelper = require('../../../../test/UsersTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');
const ThreadTableHelpers = require('../../../../test/ThreadsTableHelpers');
const CommentTableHelpers = require('../../../../test/CommentTableHelpers');
const ReplyTableHelpers = require('../../../../test/ReplyTableHelpers');

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

  describe('GetThread', () => {
    it('should return not found error', async () => {
      const server = await createServer(container);

      const response = await server.inject({
        method: 'GET',
        url: '/threads/thread-123',
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('thread tidak ditemukan');
    });
    it('should return thread', async () => {
      await UsersTableHelper.addUser({});
      await ThreadTableHelpers.addThread({});

      await CommentTableHelpers.addComment({});
      await CommentTableHelpers.addComment({ id: 'comment-321' });

      await ReplyTableHelpers.addReply({});
      await ReplyTableHelpers.addReply({ id: 'reply-311' });
      await ReplyTableHelpers.addReply({ id: 'reply-313', comment_id: 'comment-321' });
      await ReplyTableHelpers.addReply({ id: 'reply-312', comment_id: 'comment-321' });

      const server = await createServer(container);

      const response = await server.inject({
        method: 'GET',
        url: '/threads/thread-123',
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data).toBeDefined();
    });
  });
});
