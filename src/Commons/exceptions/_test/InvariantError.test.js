const InvariantError = require('../InvariantError');

describe('InvariantError', () => {
  it('should throw error correctly', () => {
    const invariantError = new InvariantError('an invariant error occurs');

    expect(invariantError.name).toEqual('InvariantError');
    expect(invariantError.message).toEqual('an invariant error occurs');
    expect(invariantError.statusCode).toEqual(400);
  });
});
