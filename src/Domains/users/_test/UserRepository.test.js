const UserRepository = require('../UserRepository');

describe('UserRepository', () => {
  it('should return an error when calling a method on an abstract class', async () => {
    const userRepository = new UserRepository();

    await expect(userRepository.addUser({})).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(userRepository.verifyAvailableUsername()).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
