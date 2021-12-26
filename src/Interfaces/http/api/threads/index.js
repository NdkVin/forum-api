const ThreadsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'Threads',
  register: async (server, { container }) => {
    const authsHandler = new ThreadsHandler(container);
    server.route(routes(authsHandler));
  },
};
