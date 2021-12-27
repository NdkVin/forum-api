const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');

class CommentHandler {
  constructor(container) {
    const { commentContainer } = container;

    this._container = commentContainer;

    this.postCommentHandler = this.postCommentHandler.bind(this);
  }

  async postCommentHandler({ payload, auth, params }, h) {
    const addCommentUseCase = this._container.getInstance(AddCommentUseCase.name);

    const { id: owner } = auth.credentials;
    const { threadId } = params;

    const addedComment = await addCommentUseCase.execute(payload, owner, threadId);

    const response = h.response({
      status: 'success',
      data: {
        addedComment,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = CommentHandler;
