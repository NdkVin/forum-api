/* eslint-disable no-param-reassign */
const GetThread = require('../../Domains/threads/entities/GetThread');

class GetThreadUseCase {
  constructor({
    threadRepository,
    commentRepository,
    replyRepository,
    likeRepository,
  }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._replyRepository = replyRepository;
    this._likeRepository = likeRepository;
  }

  async execute(threadId) {
    const thread = await this._threadRepository.getThreadById(threadId);
    const getThread = new GetThread(thread[0]);
    const replies = await this._replyRepository
      .getReplyByThreadId(threadId);
    const likes = await this._likeRepository.countLike(threadId);
    const comments = await this._commentRepository.getCommentByThreadId(threadId);

    comments.forEach(async (comment) => {
      if (comment.is_delete) {
        comment.content = '**komentar telah dihapus**';
      }
      delete comment.is_delete;

      const filteredLikeCount = likes.filter((like) => like.comment_id === comment.id);

      comment.likeCount = 0;

      if (filteredLikeCount.length) {
        comment.likeCount = parseInt(filteredLikeCount[0].count, 10);
      }

      const filteredReplies = replies.filter((reply) => reply.comment_id === comment.id);

      filteredReplies.forEach((reply) => {
        if (reply.is_delete) {
          reply.content = '**balasan telah dihapus**';
        }

        delete reply.is_delete;
        delete reply.comment_id;
      });
      comment.replies = filteredReplies;
    });
    getThread.comments = comments;
    return getThread;
  }
}

module.exports = GetThreadUseCase;
