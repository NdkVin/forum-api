const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
  it('should orchesting the delete comment action correctly', async () => {
    const threadId = 'thread-123';
    const commentId = 'comment-123';
    const owner = 'user-123';

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    mockThreadRepository.checkThreadById = jest.fn(() => Promise.resolve);
    mockCommentRepository.checkCommentByIdAndThreadId = jest.fn(() => Promise.resolve);
    mockCommentRepository.checkCommentOwner = jest.fn(() => Promise.resolve);
    mockCommentRepository.deleteComment = jest.fn(() => Promise.resolve);

    const deleteComentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    await deleteComentUseCase.execute(threadId, commentId, owner);

    expect(mockThreadRepository.checkThreadById).toBeCalledWith(threadId);
    expect(mockCommentRepository.checkCommentByIdAndThreadId).toBeCalledWith(threadId, commentId);
    expect(mockCommentRepository.checkCommentOwner).toBeCalledWith(owner, commentId);
    expect(mockCommentRepository.deleteComment).toBeCalledWith(threadId, commentId);
  });
});
