class DeleteCommentUseCase {
  constructor({
    threadRepository,
    commentRepository,
  }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(threadId, commentId, owner) {
    await this._threadRepository.checkThreadById(threadId);
    await this._commentRepository.checkCommentByIdAndThreadId(threadId, commentId);
    await this._commentRepository.checkCommentOwner(owner, commentId);
    await this._commentRepository.deleteComment(threadId, commentId);
  }
}

module.exports = DeleteCommentUseCase;
