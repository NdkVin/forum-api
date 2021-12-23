const AddThread = require('../../Domains/threads/entities/AddThread');

class AddThreadUseCase {
  constructor({
    validator,
    threadRepository,
  }) {
    this._validator = validator;
    this._threadRepository = threadRepository;
  }

  async execute(payload) {
    this._validator.validate(payload);

    const addPayload = new AddThread(payload);
    const result = await this._threadRepository.addThread(addPayload);
    return result;
  }
}

module.exports = AddThreadUseCase;
