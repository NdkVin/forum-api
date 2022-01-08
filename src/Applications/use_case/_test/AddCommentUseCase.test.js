const AddCommentValidator = require('../../validator/AddCommentValidator');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const AddComment = require('../../../Domains/comments/entities/AddComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const AddCommentUseCase = require('../AddCommentUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');

describe('AddCommentUseCase', () => {
  it('should orchesting the add comment action correctly', async () => {
    const AddCommentPayload = {
      content: 'content',
    };
    const addComment = new AddComment(AddCommentPayload);
    const owner = 'user-123';
    const threadId = 'thread-123';
    const expectedAddedCommentReturn = new AddedComment({
      id: 'comment-123',
      content: 'content',
      owner,
    });

    const mockAddCommentValidator = new AddCommentValidator();
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    mockAddCommentValidator.validate = jest.fn(() => Promise.resolve);
    mockCommentRepository.addComment = jest.fn(() => Promise.resolve(expectedAddedCommentReturn));
    mockThreadRepository.checkThreadById = jest.fn(() => Promise.resolve);

    const addCommentUsecase = new AddCommentUseCase({
      validator: mockAddCommentValidator,
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    const result = await addCommentUsecase.execute(AddCommentPayload, owner, threadId);

    expect(result).toStrictEqual(expectedAddedCommentReturn);
    expect(mockAddCommentValidator.validate).toBeCalledWith(AddCommentPayload);
    expect(mockCommentRepository.addComment).toBeCalledWith(addComment, owner, threadId);
    expect(mockThreadRepository.checkThreadById).toBeCalledWith(threadId);
  });
});
