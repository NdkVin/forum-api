/* eslint-disable no-unused-vars */
class ReplyRepository {
  async addReply(payload, threadId, commentId, owner) {
    throw new Error('REPLY_REPOSITORY_METHOD.NOT_IMPLEMENTED');
  }

  async checkReplyOwner(replyId, userId) {
    throw new Error('REPLY_REPOSITORY_METHOD.NOT_IMPLEMENTED');
  }

  async checkReply(threadId, commnetId, replyId) {
    throw new Error('REPLY_REPOSITORY_METHOD.NOT_IMPLEMENTED');
  }

  async deleteReply(replyid) {
    throw new Error('REPLY_REPOSITORY_METHOD.NOT_IMPLEMENTED');
  }

  async getReplyBythreadIdAndCommentId(threadId, replyId) {
    throw new Error('REPLY_REPOSITORY_METHOD.NOT_IMPLEMENTED');
  }
}

module.exports = ReplyRepository;
