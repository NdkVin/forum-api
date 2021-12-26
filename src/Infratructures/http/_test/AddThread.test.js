const pool = require('../../database/postgres/pool');
const UsersTableHelper = require('../../../../test/UsersTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('AddThread', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableHelper.cleanTable();
  });

  describe('AddThread', () => {
    it('should return an error when send empty payload', async () => {
      const addThreadPayload = {};

      await UsersTableHelper.addUser({});
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
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('title harus diisi');
    });

    it('should return an error when send incomplete payload', async () => {
      const addThreadPayload = {
        title: 'ini judul',
      };

      await UsersTableHelper.addUser({});
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
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('body harus diisi');
    });

    it('should return an error when send incomplete payload', async () => {
      const addThreadPayload = {
        body: 'ini body',
      };

      await UsersTableHelper.addUser({});
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
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('title harus diisi');
    });

    it('should return an error when send incorrect data type on payload', async () => {
      const addThreadPayload = {
        title: 'andika',
        body: true,
      };

      await UsersTableHelper.addUser({});
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
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('body harus berupa string');
    });

    it('should not return error', async () => {
      const addThreadPayload = {
        title: 'ini judul',
        body: 'ini body',
      };

      await UsersTableHelper.addUser({});
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
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data).toBeDefined();
      expect(typeof responseJson.data).toEqual('object');
      expect(typeof responseJson.data.addedThread.id).toEqual('string');
      expect(responseJson.data.addedThread.title).toEqual(addThreadPayload.title);
      expect(responseJson.data.addedThread.owner).toEqual('user-123');
      console.log(responseJson.data.addedThread);
    });
  });
});
