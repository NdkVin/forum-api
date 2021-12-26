const AddComment = require('../../Domains/comments/entities/AddComment');
const AddedComment = require('../../Domains/comments/entities/AddedComment');

class AddCommentUseCase {
  constructor({
    validator,
    commentRepository,
  }) {
    this._validator = validator;
    this._commentRepository = commentRepository;
  }

  async execute(payload, owner, thread_id) {
    this._validator.validate(payload);

    const addComment = new AddComment(payload);

    const result = await this._commentRepository.addComment(addComment, owner, thread_id);

    const addedComment = new AddedComment(result);
    return addedComment;
  }
}

module.exports = AddCommentUseCase;
