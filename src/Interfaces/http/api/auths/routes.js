const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuthsHandler,
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.putAuthsHandler,
  },
];

module.exports = routes;
