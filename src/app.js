require('dotenv').config();
const createServer = require('./Infratructures/http/createServer');
const container = require('./Infratructures/container');

const start = async () => {
  const server = await createServer(container);
  await server.start();
  console.log(`server is running on ${server.info.uri}`);
};

start();
