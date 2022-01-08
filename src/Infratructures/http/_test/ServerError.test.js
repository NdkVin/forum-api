const pool = require('../../database/postgres/pool');
const container = require('../../container');
const createServer = require('../createServer');
const ThreadTableHelpers = require('../../../../test/ThreadsTableHelpers');

describe('AddThread', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await ThreadTableHelpers.cleanTable();
  });

  describe('GetThread', () => {
    it('should return not found error', async () => {
      const addThreadPayload = {
        title: 'ini judul',
        body: 'ini body',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: addThreadPayload,
        auth: {
          strategy: 'forumapi_api',
          credentials: {
            id: 'user-123',
          },
        },
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(500);
      expect(responseJson.status).toEqual('error');
      expect(responseJson.message).toEqual('terjadi kegagalan pada server kami');
    });
  });
});
