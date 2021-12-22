const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuthsHandler,
  },
];

module.exports = routes;
