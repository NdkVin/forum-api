const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const LikeRepository = require('../../../Domains/likes/LikeRepository');
const LikeCommentUseCase = require('../LikeCommentUseCase');

describe('LikeCommentUseCase', () => {
  it('should orchesting the like comment action correctly', async () => {
    const threadId = 'thread-123';
    const commentId = 'comment-123';
    const userId = 'user-123';

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockLikeRepository = new LikeRepository();

    mockThreadRepository.checkThreadById = jest.fn(() => Promise.resolve);
    mockCommentRepository.checkCommentByIdAndThreadId = jest.fn(() => Promise.resolve);
    mockLikeRepository.checkLike = jest.fn(() => Promise.resolve(0));
    mockLikeRepository.like = jest.fn(() => Promise.resolve('like'));

    const likeCommentUseCase = new LikeCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      likeRepository: mockLikeRepository,
    });

    const result = await likeCommentUseCase.execute(threadId, commentId, userId);

    expect(mockThreadRepository.checkThreadById).toBeCalledWith(threadId);
    expect(mockCommentRepository.checkCommentByIdAndThreadId).toBeCalledWith(threadId, commentId);
    expect(mockLikeRepository.checkLike).toBeCalledWith(threadId, commentId, userId);
    expect(mockLikeRepository.like).toBeCalledWith(threadId, commentId, userId);
    expect(result).toEqual('like');
  });

  it('should orchesting the unlike comment action correctly', async () => {
    const threadId = 'thread-123';
    const commentId = 'comment-123';
    const userId = 'user-123';

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockLikeRepository = new LikeRepository();

    mockThreadRepository.checkThreadById = jest.fn(() => Promise.resolve);
    mockCommentRepository.checkCommentByIdAndThreadId = jest.fn(() => Promise.resolve);
    mockLikeRepository.checkLike = jest.fn(() => Promise.resolve(1));
    mockLikeRepository.unlike = jest.fn(() => Promise.resolve('unlike'));

    const likeCommentUseCase = new LikeCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      likeRepository: mockLikeRepository,
    });

    const result = await likeCommentUseCase.execute(threadId, commentId, userId);

    expect(mockThreadRepository.checkThreadById).toBeCalledWith(threadId);
    expect(mockCommentRepository.checkCommentByIdAndThreadId).toBeCalledWith(threadId, commentId);
    expect(mockLikeRepository.checkLike).toBeCalledWith(threadId, commentId, userId);
    expect(mockLikeRepository.unlike).toBeCalledWith(threadId, commentId, userId);
    expect(result).toEqual('unlike');
  });
});
