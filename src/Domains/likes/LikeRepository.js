/* eslint-disable no-unused-vars */
class LikeRepository {
  async checkLike(threadId, commentId, userId) {
    throw new Error('LIKE_REPOSITORY_METHOD.NOT_IMPLEMENTED');
  }

  async like(threadId, commentId, userId) {
    throw new Error('LIKE_REPOSITORY_METHOD.NOT_IMPLEMENTED');
  }

  async unlike(threadId, commentId, userId) {
    throw new Error('LIKE_REPOSITORY_METHOD.NOT_IMPLEMENTED');
  }

  async countLike(threadId, commentId, userId) {
    throw new Error('LIKE_REPOSITORY_METHOD.NOT_IMPLEMENTED');
  }
}

module.exports = LikeRepository;
