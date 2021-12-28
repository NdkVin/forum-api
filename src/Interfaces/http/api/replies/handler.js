const AddReplyUseCase = require('../../../../Applications/use_case/AddReplyUseCase');
const DeleteReplyUseCase = require('../../../../Applications/use_case/DeleteReplyUseCase');

class ReplyHandler {
  constructor(container) {
    const { replyContainer } = container;

    this._container = replyContainer;

    this.postReplyHandler = this.postReplyHandler.bind(this);
    this.deleteReplyHandler = this.deleteReplyHandler.bind(this);
  }

  async postReplyHandler({ payload, auth, params }, h) {
    const addReplyUseCase = this._container.getInstance(AddReplyUseCase.name);

    const { threadId, commentId } = params;
    const { id: owner } = auth.credentials;

    const addedReply = await addReplyUseCase.execute(payload, threadId, commentId, owner);

    const response = h.response({
      status: 'success',
      data: {
        addedReply,
      },
    });
    response.code(201);
    return response;
  }

  async deleteReplyHandler({ auth, params }) {
    const deleteReplyUseCase = this._container.getInstance(DeleteReplyUseCase.name);

    const { threadId, commentId, replyId } = params;

    const { id: owner } = auth.credentials;

    await deleteReplyUseCase.execute(threadId, commentId, replyId, owner);

    return {
      status: 'success',
    };
  }
}

module.exports = ReplyHandler;
