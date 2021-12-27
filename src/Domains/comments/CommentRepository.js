/* eslint-disable no-unused-vars */
class CommentRepository {
  async addComment(payload, owner, thread_id) {
    throw new Error('COMMENT_REPOSITORY_METHOD.NOT_IMPLEMENTED');
  }

  async deleteComment(thread_id, comment_id) {
    throw new Error('COMMENT_REPOSITORY_METHOD.NOT_IMPLEMENTED');
  }

  async checkCommentOwner(user_id, comment_id) {
    throw new Error('COMMENT_REPOSITORY_METHOD.NOT_IMPLEMENTED');
  }

  async getCommentByIdAndThreadId(thread_id, comment_id) {
    throw new Error('COMMENT_REPOSITORY_METHOD.NOT_IMPLEMENTED');
  }
}

module.exports = CommentRepository;
