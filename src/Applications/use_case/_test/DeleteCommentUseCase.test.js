const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
  it('hould orchesting the delete comment action correctly', async () => {
    const threadId = 'thread-123';
    const commentId = 'comment-123';
    const owner = 'user-123';

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve);
    mockCommentRepository.getCommentById = jest.fn()
      .mockImplementation(() => Promise.resolve);
    mockCommentRepository.checkCommentOwner = jest.fn()
      .mockImplementation(() => Promise.resolve);
    mockCommentRepository.deleteComment = jest.fn()
      .mockImplementation(() => Promise.resolve);

    const deleteComentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    await deleteComentUseCase.execute(threadId, commentId, owner);

    expect(mockThreadRepository.getThreadById).toBeCalledWith(threadId);
    expect(mockCommentRepository.getCommentById).toBeCalledWith(commentId);
    expect(mockCommentRepository.checkCommentOwner).toBeCalledWith(owner, commentId);
    expect(mockCommentRepository.deleteComment).toBeCalledWith(threadId, commentId);
  });
});
