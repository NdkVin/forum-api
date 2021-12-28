const AddComment = require('../../Domains/comments/entities/AddComment');
const AddedComment = require('../../Domains/comments/entities/AddedComment');

class AddCommentUseCase {
  constructor({
    validator,
    commentRepository,
    threadRepository,
  }) {
    this._validator = validator;
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(payload, owner, thread_id) {
    this._validator.validate(payload);

    const addComment = new AddComment(payload);
    await this._threadRepository.checkThreadById(thread_id);
    const result = await this._commentRepository.addComment(addComment, owner, thread_id);

    const addedComment = new AddedComment(result);
    return addedComment;
  }
}

module.exports = AddCommentUseCase;
