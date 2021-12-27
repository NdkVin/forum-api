const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');
const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase');

class CommentHandler {
  constructor(container) {
    const { commentContainer } = container;

    this._container = commentContainer;

    this.postCommentHandler = this.postCommentHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
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

  async deleteCommentHandler({ params, auth }) {
    const deleteCommentUseCase = this._container.getInstance(DeleteCommentUseCase.name);

    const { threadId, commentId } = params;
    const { id: owner } = auth.credentials;
    await deleteCommentUseCase.execute(threadId, commentId, owner);

    return {
      status: 'success',
    };
  }
}

module.exports = CommentHandler;
