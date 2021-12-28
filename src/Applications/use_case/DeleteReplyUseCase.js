class DeleteReplyUseCase {
  constructor({
    threadRepository,
    commentRepository,
    replyRepository,
  }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._replyRepository = replyRepository;
  }

  async execute(threadId, commentId, replyId, owner) {
    await this._threadRepository.checkThreadById(threadId);
    await this._commentRepository.checkCommentByIdAndThreadId(threadId, commentId);
    await this._replyRepository.checkReply(threadId, commentId, replyId);
    await this._replyRepository.checkReplyOwner(replyId, owner);
    await this._replyRepository.deleteReply(replyId);
  }
}

module.exports = DeleteReplyUseCase;
