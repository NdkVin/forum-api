const AddReply = require('../../Domains/replies/entities/AddReply');
const AddedReply = require('../../Domains/replies/entities/AddedReply');

class AddReplyUseCase {
  constructor({
    validator,
    replyRepository,
  }) {
    this._validator = validator;
    this._replyRepository = replyRepository;
  }

  async execute(payload, threadId, commentId, owner) {
    this._validator.validate(payload);
    const addReply = new AddReply(payload);

    const result = await this._replyRepository.addReply(addReply, threadId, commentId, owner);
    const addedReply = new AddedReply(result);

    return addedReply;
  }
}

module.exports = AddReplyUseCase;
