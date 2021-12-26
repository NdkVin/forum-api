/* eslint-disable no-unused-vars */
class CommentRepository {
  async addComment(payload, owner, thread_id) {
    throw new Error('COMMENT_REPOSITORY_METHOD.NOT_IMPLEMENTED');
  }

  async deleteComment(id) {
    throw new Error('COMMENT_REPOSITORY_METHOD.NOT_IMPLEMENTED');
  }
}

module.exports = CommentRepository;
