const pool = require('../../database/postgres/pool');
const UsersTableHelper = require('../../../../test/UsersTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');
const ThreadTableHelpers = require('../../../../test/ThreadsTableHelpers');
const CommentTableHelpers = require('../../../../test/CommentTableHelpers');
const LikeTableHelpers = require('../../../../test/LikeTableHelpers');

describe('AddThread', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableHelper.cleanTable();
    await ThreadTableHelpers.cleanTable();
    await CommentTableHelpers.cleanTable();
    await LikeTableHelpers.cleanTable();
  });

  describe('GetThread', () => {
    it('should return not found error', async () => {
      await UsersTableHelper.addUser({});
      await ThreadTableHelpers.addThread({});
      await CommentTableHelpers.addComment({});

      const server = await createServer(container);

      const response = await server.inject({
        method: 'PUT',
        url: '/threads/thread-123/comments/comment-123/likes',
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
});
