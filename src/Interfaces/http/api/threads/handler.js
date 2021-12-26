const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');

class ThreadsHandler {
  constructor(container) {
    const { threadsContainer } = container;
    this._container = threadsContainer;

    this.postThreadHandler = this.postThreadHandler.bind(this);
  }

  async postThreadHandler({ payload, auth }, h) {
    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);

    const { id: owner } = auth.credentials;

    const addedThread = await addThreadUseCase.execute(payload, owner);

    const response = h.response({
      status: 'success',
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = ThreadsHandler;
