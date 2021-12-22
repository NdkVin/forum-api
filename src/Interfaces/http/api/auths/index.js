const AuthsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'Auths',
  register: async (server, { container }) => {
    const authsHandler = new AuthsHandler(container);
    server.route(routes(authsHandler));
  },
};
