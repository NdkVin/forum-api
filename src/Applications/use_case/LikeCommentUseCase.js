class LikeCommentUseCase {
  constructor({
    threadRepository,
    commentRepository,
    likeRepository,
  }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._likeRepository = likeRepository;
  }

  async execute(threadId, commentId, userId) {
    await this._threadRepository.checkThreadById(threadId);
    await this._commentRepository.checkCommentByIdAndThreadId(threadId, commentId);

    const isLike = await this._likeRepository.checkLike(threadId, commentId, userId);

    if (!isLike) {
      const res = await this._likeRepository.like(threadId, commentId, userId);
      return res;
    }

    const res = await this._likeRepository.unlike(threadId, commentId, userId);
    return res;
  }
}

module.exports = LikeCommentUseCase;
