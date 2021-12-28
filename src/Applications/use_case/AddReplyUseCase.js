const AddReply = require('../../Domains/replies/entities/AddReply');
const AddedReply = require('../../Domains/replies/entities/AddedReply');

class AddReplyUseCase {
  constructor({
    validator,
    replyRepository,
    threadRepository,
    commentRepository,
  }) {
    this._validator = validator;
    this._replyRepository = replyRepository;
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(payload, threadId, commentId, owner) {
    this._validator.validate(payload);
    const addReply = new AddReply(payload);
    await this._threadRepository.checkThreadById(threadId);
    await this._commentRepository.checkCommentByIdAndThreadId(threadId, commentId);

    const result = await this._replyRepository.addReply(addReply, threadId, commentId, owner);
    const addedReply = new AddedReply(result);
    return addedReply;
  }
}

module.exports = AddReplyUseCase;
