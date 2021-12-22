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
  {
    method: 'DELETE',
    path: '/authentications',
    handler: handler.deleteAuthsHandler,
  },
];

module.exports = routes;
