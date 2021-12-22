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
    it('should return an error when the sent payload is incomplete', async () => {
      const loginPayload = {
        username: 'andika',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: loginPayload,
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('password harus diisi');
    });

    it('should return an error when the data type that the payload is sending is wrong', async () => {
      const loginPayload = {
        username: 'andika',
        password: true,
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: loginPayload,
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('password harus berupa string');
    });

    it('should return an error username that was sent not found', async () => {
      const loginPayload = {
        username: 'andika',
        password: 'password',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: loginPayload,
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('username tidak ditemukan');
    });

    it('should throw invariant error when password not valid', async () => {
      const addUser = {
        username: 'andika',
        password: 'password',
        fullname: 'andika',
      };

      const server = await createServer(container);
      await server.inject({
        method: 'POST',
        url: '/users',
        payload: addUser,
      });

      const loginPayload = {
        username: 'andika',
        password: 'passwordyanglain',
      };

      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: loginPayload,
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('kredensial yang anda masukan salah');
    });

    it('should return access token and refresh token', async () => {
      const addUser = {
        username: 'andika',
        password: 'password',
        fullname: 'andika',
      };

      const server = await createServer(container);
      await server.inject({
        method: 'POST',
        url: '/users',
        payload: addUser,
      });

      const loginPayload = {
        username: 'andika',
        password: 'password',
      };

      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: loginPayload,
      });
      const responseJson = JSON.parse(response.payload);
      const {
        data: {
          accessToken,
          refreshToken,
        },
      } = responseJson;
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(typeof accessToken).toEqual('string');
      expect(typeof refreshToken).toEqual('string');
    });
  });
});
