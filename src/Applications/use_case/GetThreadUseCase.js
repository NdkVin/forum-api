/* eslint-disable no-param-reassign */
const GetThread = require('../../Domains/threads/entities/GetThread');

class GetThreadUseCase {
  constructor({
    threadRepository,
    commentRepository,
    replyRepository,
  }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._replyRepository = replyRepository;
  }

  async execute(threadId) {
    const thread = await this._threadRepository.getThreadById(threadId);
    const getThread = new GetThread(thread);

    const comments = await this._commentRepository.getCommentByThreadId(threadId);

    comments.forEach(async (comment) => {
      if (comment.is_delete) {
        comment.content = '**balasan telah dihapus**';
      }
      delete comment.is_delete;

      const replies = await this._replyRepository
        .getReplyBythreadIdAndCommentId(threadId, comment.id);

      replies.forEach(async (reply) => {
        if (reply.is_delete) {
          reply.content = '**balasan telah dihapus**';
        }

        delete reply.is_delete;
      });

      comment.replies = replies;
    });
    getThread.comments = comments;
    console.log(getThread);
  }
}

module.exports = GetThreadUseCase;
