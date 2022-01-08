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

  describe('AddUsers', () => {
    it('should return an error when send empty payload', async () => {
      const addUserPayload = {};

      await UsersTableHelper.addUser({});
      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: addUserPayload,
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('username harus diisi');
    });

    it('should return an error when send incomplete payload', async () => {
      const addUserPayload = {
        username: 'andika',
        password: 'andika',
      };

      await UsersTableHelper.addUser({});
      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: addUserPayload,
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('fullname harus diisi');
    });

    it('should return an error when send payload with incorrect data type', async () => {
      const addUserPayload = {
        username: 'andika',
        password: 'andika',
        fullname: 1123,
      };

      await UsersTableHelper.addUser({});
      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: addUserPayload,
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('fullname harus berupa string');
    });

    it('should return an error when send payload with incorrect data type', async () => {
      const addUserPayload = {
        username: 'qwert',
        password: 'andika',
        fullname: 'andika',
      };

      await UsersTableHelper.addUser({});
      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: addUserPayload,
      });
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data).toBeDefined();
    });
  });
});
