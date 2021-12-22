const pool = require('../../database/postgres/pool');
const UsersTableHelper = require('../../../../test/UsersTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('Login USer', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableHelper.cleanTable();
  });

  describe('Login', () => {
    it('should return an error when send invalid data type of refresh token', async () => {
      const refreshPayload = {
        refreshToken: true,
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'PUT',
        url: '/authentications',
        payload: refreshPayload,
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('refresh token harus berupa string');
    });

    it('should return an error when send empty of refresh token', async () => {
      const refreshPayload = {};

      const server = await createServer(container);

      const response = await server.inject({
        method: 'PUT',
        url: '/authentications',
        payload: refreshPayload,
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('refresh token harus diisi');
    });

    it('should return an error when send invalid refresh token', async () => {
      const refreshPayload = {
        refreshToken: 'andika',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'PUT',
        url: '/authentications',
        payload: refreshPayload,
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('refresh token tidak valid');
    });

    it('should return new access token', async () => {
      const registerPayload = {
        username: 'andika',
        password: 'andika',
        fullname: 'andika',
      };

      const loginPayload = {
        username: 'andika',
        password: 'andika',
      };

      const server = await createServer(container);

      await server.inject({
        method: 'POST',
        url: '/users',
        payload: registerPayload,
      });

      const loginResult = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: loginPayload,
      });

      const loginResultJson = JSON.parse(loginResult.payload);
      const {
        data: {
          refreshToken,
        },
      } = loginResultJson;

      const refreshPayload = {
        refreshToken,
      };

      const refreshResult = await server.inject({
        method: 'PUT',
        url: '/authentications',
        payload: refreshPayload,
      });

      const refreshResultJson = JSON.parse(refreshResult.payload);
      expect(refreshResult.statusCode).toEqual(200);
      expect(refreshResultJson.status).toEqual('success');
      expect(typeof refreshResultJson.data.accessToken).toEqual('string');
    });
  });
});
