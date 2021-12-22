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
      const logoutUserPayload = {
        refreshToken: true,
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'DELETE',
        url: '/authentications',
        payload: logoutUserPayload,
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('refresh token harus berupa string');
    });

    it('should return an error when send invalid  refresh token', async () => {
      const logoutUserPayload = {
        refreshToken: 'asd',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'DELETE',
        url: '/authentications',
        payload: logoutUserPayload,
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('refresh token tidak ditemukan di database');
    });

    it('should return an error when send empty refresh token', async () => {
      const logoutUserPayload = {};

      const server = await createServer(container);

      const response = await server.inject({
        method: 'DELETE',
        url: '/authentications',
        payload: logoutUserPayload,
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('refresh token harus diisi');
    });

    it('should not return an error when success to logout user', async () => {
      const registerUserPayload = {
        username: 'andika',
        password: 'andika',
        fullname: 'andika',
      };

      const loginUserPayload = {
        username: 'andika',
        password: 'andika',
      };

      const server = await createServer(container);

      await server.inject({
        method: 'POST',
        url: '/users',
        payload: registerUserPayload,
      });

      const resultLogin = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: loginUserPayload,
      });

      const resultLoginJson = JSON.parse(resultLogin.payload);
      const {
        data: {
          refreshToken,
        },
      } = resultLoginJson;

      const logoutPayload = {
        refreshToken,
      };

      const resultLogout = await server.inject({
        method: 'DELETE',
        url: '/authentications',
        payload: logoutPayload,
      });

      const resultLogoutJson = JSON.parse(resultLogout.payload);

      expect(resultLogout.statusCode).toEqual(200);
      expect(resultLogoutJson.status).toEqual('success');
      expect(resultLogoutJson.message).toEqual('berhasil logout');
    });
  });
});
