const AddUserUseCase = require('../../../../Applications/use_case/AddUserUseCase');

class UsersHandler {
  constructor(container) {
    const { usersContainer } = container;
    this._container = usersContainer;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler({ payload }, h) {
    const addUserUseCase = this._container.getInstance(AddUserUseCase.name);
    const addedUser = await addUserUseCase.execute(payload);

    const response = h.response({
      status: 'success',
      data: {
        addedUser,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = UsersHandler;
