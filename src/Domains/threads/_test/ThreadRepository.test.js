const ThreadRepository = require('../ThreadRepository');

describe('ThreadRepsitory', () => {
  it('should throw error when directly call thread repository method', async () => {
    const threadRepository = new ThreadRepository();

    await expect(threadRepository.addThread).rejects.toThrowError('THREAD_REPOSITORY_METHOD.NOT_IMPLEMENTED');
    await expect(threadRepository.checkThreadById).rejects.toThrowError('THREAD_REPOSITORY_METHOD.NOT_IMPLEMENTED');
    await expect(threadRepository.getThreadById).rejects.toThrowError('THREAD_REPOSITORY_METHOD.NOT_IMPLEMENTED');
  });
});
