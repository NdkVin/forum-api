const AddThread = require('../../Domains/threads/entities/AddThread');
const AddedThread = require('../../Domains/threads/entities/AddedThread');

class AddThreadUseCase {
  constructor({
    validator,
    threadRepository,
  }) {
    this._validator = validator;
    this._threadRepository = threadRepository;
  }

  async execute(payload, owner) {
    this._validator.validate(payload);

    const addPayload = new AddThread(payload);
    const result = await this._threadRepository.addThread(addPayload, owner);

    const addedThread = new AddedThread(result);
    return addedThread;
  }
}

module.exports = AddThreadUseCase;
