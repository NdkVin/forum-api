const pool = require('../../database/postgres/pool');
const UsersTableHelper = require('../../../../test/UsersTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('HTTP server', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableHelper.cleanTable();
  });

  it('should return response 404 when request unregistered route', async () => {
    const server = await createServer({});

    const response = await server.inject({
      method: 'POST',
      url: '/unregisteredUrl',
    });
    expect(response.statusCode).toEqual(404);
  });

  describe('when POST /users', () => {
    it('should return response code 201 and persisted user', async () => {
      const requestPayload = {
        username: 'andika',
        password: 'secret',
        fullname: 'andika andika',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedUser).toBeDefined();
    });

    it('should return response code 400 when request payload not contain needed property', async () => {
      const requestPayload = {
        username: 'andika',
        password: 'secret',
      };

      const server = createServer(container);

      const response = await (await server).inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('fullname harus diisi');
    });

    it('should return an error if the data sent does not match', async () => {
      const requestPayload = {
        username: 'andika',
        password: 123,
        fullname: 'andika andika',
      };

      const server = createServer(container);

      const response = await (await server).inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('password harus berupa string');
    });

    it('should return an error if username more than 50 character', async () => {
      const requestPayload = {
        username: 'andikaandikaandikaandikaandikaandikaandikaandikaandikaandikaandikaandika',
        password: 'password',
        fullname: 'andika andika',
      };

      const server = createServer(container);

      const response = await (await server).inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('username berisi maksimal 50 karakter');
    });

    it('should return an error if username contain restrict character', async () => {
      const requestPayload = {
        username: 'andi ka',
        password: 'password',
        fullname: 'andika andika',
      };

      const server = createServer(container);

      const response = await (await server).inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat melakukan registrasi karena username mengandung karakter terlarang');
    });

    it('should return an error if username not available', async () => {
      await UsersTableHelper.addUser({ username: 'andika' });

      const requestPayload = {
        username: 'andika',
        password: 'password',
        fullname: 'andika andika',
      };

      const server = createServer(container);

      const response = await (await server).inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('username tidak tersedia');
    });

    it('should handle server error correctly', async () => {
      await UsersTableHelper.addUser({ username: 'andika' });

      const requestPayload = {
        username: 'andika',
        password: 'password',
        fullname: 'andika andika',
      };

      const server = createServer({});

      const response = await (await server).inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(500);
      expect(responseJson.status).toEqual('error');
      expect(responseJson.message).toEqual('terjadi kegagalan pada server kami');
    });
  });
});
