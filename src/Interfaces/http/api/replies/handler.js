const AddReplyUseCase = require('../../../../Applications/use_case/AddReplyUseCase');

class ReplyHandler {
  constructor(container) {
    const { replyContainer } = container;

    this._container = replyContainer;

    this.postReplyHandler = this.postReplyHandler.bind(this);
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
}

module.exports = ReplyHandler;
