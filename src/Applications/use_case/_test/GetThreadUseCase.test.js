const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ReplyRepository = require('../../../Domains/replies/ReplyRepository');
const GetThreadUseCase = require('../GetThreadUseCase');

describe('GetThreadUseCase', () => {
  it('should orchesting the get thread action correctly', async () => {
    const responseGetThread = [{
      id: 'thread-fxZEbdhLCddxRShB',
      title: 'sebuah thread',
      body: 'sebuah body thread',
      date: '2021-12-29T15:34:06.045Z',
      username: 'dicoding',
    }];

    const responseComment = [
      {
        id: 'comment-123',
        username: 'andika',
        date: '27-12-21',
        content: 'ini content',
        is_delete: false,
      },
      {
        id: 'comment-321',
        username: 'asd',
        date: '1212121',
        content: 'ini content',
        is_delete: true,
      },
    ];

    const responseReply = [
      {
        id: 'reply-123',
        content: 'ini asdas content',
        date: '27-12-21',
        username: 'andika',
        is_delete: false,
        comment_id: 'comment-123',
      },
      {
        id: 'reply-321',
        content: 'ini content',
        date: '27-12-21',
        username: 'andika',
        is_delete: true,
        comment_id: 'comment-123',
      },
      {
        id: 'reply-12312',
        content: 'ini ya content',
        date: '27-12-21',
        username: 'andika',
        is_delete: false,
        comment_id: 'comment-321',
      },
      {
        id: 'reply-12312',
        content: 'ini ya asd content',
        date: '27-12-21',
        username: 'andika',
        is_delete: true,
        comment_id: 'comment-321',
      },
    ];

    const threadId = 'thread-123';
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyRepository();

    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(responseGetThread));
    mockCommentRepository.getCommentByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve(responseComment));
    mockReplyRepository.getReplyByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve(responseReply));

    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    const result = await getThreadUseCase.execute(threadId);

    expect(mockThreadRepository.getThreadById).toBeCalledWith(threadId);
    expect(mockCommentRepository.getCommentByThreadId).toBeCalledWith(threadId);
    expect(mockReplyRepository.getReplyByThreadId).toBeCalledWith(threadId);
    console.log(result.comments[0].replies);
  });
});
