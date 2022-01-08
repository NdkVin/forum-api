const LikeRepository = require('../LikeRepository');

describe('LikeRepository', () => {
  it('should return error when directly call like repository method', async () => {
    const likeRepository = new LikeRepository();

    await expect(() => likeRepository.checkLike('', '', '')).rejects.toThrowError('LIKE_REPOSITORY_METHOD.NOT_IMPLEMENTED');
    await expect(() => likeRepository.like('', '', '')).rejects.toThrowError('LIKE_REPOSITORY_METHOD.NOT_IMPLEMENTED');
    await expect(() => likeRepository.unlike('', '', '')).rejects.toThrowError('LIKE_REPOSITORY_METHOD.NOT_IMPLEMENTED');
    await expect(() => likeRepository.countLike('')).rejects.toThrowError('LIKE_REPOSITORY_METHOD.NOT_IMPLEMENTED');
  });
});
