const LikeCommentUseCase = require('../../../../Applications/use_case/LikeCommentUseCase');

class LikesHandler {
  constructor(container) {
    const { likeContainer } = container;
    this._container = likeContainer;

    this.postLikeHandler = this.postLikeHandler.bind(this);
  }

  async postLikeHandler({ params, auth }) {
    const likeCommentUseCase = this._container.getInstance(LikeCommentUseCase.name);

    const { threadId, commentId } = params;
    const { id: userId } = auth.credentials;

    await likeCommentUseCase.execute(threadId, commentId, userId);

    return {
      status: 'success',
    };
  }
}

module.exports = LikesHandler;
