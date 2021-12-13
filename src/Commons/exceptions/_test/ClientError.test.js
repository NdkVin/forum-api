const ClientError = require('../ClientError');

describe('Client error', () => {
  it('should return error when directly use client error', () => {
    expect(() => new ClientError('')).toThrowError('Cannot instantiate abstract class');
  });
});
