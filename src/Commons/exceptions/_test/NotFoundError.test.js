const NotFoundError = require('../NotFoundError');

describe('NotFoundError', () => {
  it('should throw error correctly', () => {
    const notFoundError = new NotFoundError('notfound error occurs');

    expect(notFoundError.name).toEqual('NotFoundError');
    expect(notFoundError.message).toEqual('notfound error occurs');
    expect(notFoundError.statusCode).toEqual(404);
  });
});
