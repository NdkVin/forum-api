const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ReplyRepository = require('../../../Domains/replies/ReplyRepository');
const DeleteReplyUseCase = require('../DeleteReplyUseCase');

describe('DeleteReplyUseCase', () => {
  it('should orchesting the delete reply action correctly', async () => {
    const threadId = 'thread-123';
    const commentId = 'comment-123';
    const replyId = 'reply-123';
    const owner = 'user-123';

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyRepository();

    mockThreadRepository.checkThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve);
    mockCommentRepository.checkCommentByIdAndThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve);
    mockReplyRepository.checkReply = jest.fn()
      .mockImplementation(() => Promise.resolve);
    mockReplyRepository.checkReplyOwner = jest.fn()
      .mockImplementation(() => Promise.resolve);
    mockReplyRepository.deleteReply = jest.fn()
      .mockImplementation(() => Promise.resolve);

    const deleteReplyUseCase = new DeleteReplyUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    await deleteReplyUseCase.execute(threadId, commentId, replyId, owner);

    expect(mockThreadRepository.checkThreadById).toBeCalledWith(threadId);
    expect(mockCommentRepository.checkCommentByIdAndThreadId).toBeCalledWith(threadId, commentId);
    expect(mockReplyRepository.checkReply).toBeCalledWith(threadId, commentId, replyId);
    expect(mockReplyRepository.checkReplyOwner).toBeCalledWith(replyId, owner);
    expect(mockReplyRepository.deleteReply).toBeCalledWith(replyId);
  });
});
