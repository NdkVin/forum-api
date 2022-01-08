const AddReplyValidator = require('../../validator/AddReplyValidator');
const AddReply = require('../../../Domains/replies/entities/AddReply');
const AddedReply = require('../../../Domains/replies/entities/AddedReply');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ReplyRepository = require('../../../Domains/replies/ReplyRepository');
const AddReplyUseCase = require('../AddReplyUseCase');

describe('AddReplyUseCase', () => {
  it('should orchesting the add user action correctly', async () => {
    const AddReplyPayload = {
      content: 'ini content',
    };
    const addReply = new AddReply(AddReplyPayload);
    const threadId = 'thread-123';
    const commentId = 'comment-123';
    const owner = 'user-123';

    const AddReplyResponse = {
      id: 'reply-123',
      content: AddReplyPayload.content,
      owner,
    };

    const addedReply = new AddedReply(AddReplyResponse);

    const mockAddReplyValidator = new AddReplyValidator();
    const mockReplyrepository = new ReplyRepository();
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    mockAddReplyValidator.validate = jest.fn(() => Promise.resolve);
    mockReplyrepository.addReply = jest.fn(() => Promise.resolve(AddReplyResponse));
    mockThreadRepository.checkThreadById = jest.fn(() => Promise.resolve);
    mockCommentRepository.checkCommentByIdAndThreadId = jest.fn(() => Promise.resolve);

    const addReplyUseCase = new AddReplyUseCase({
      validator: mockAddReplyValidator,
      replyRepository: mockReplyrepository,
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    const result = await addReplyUseCase.execute(AddReplyPayload, threadId, commentId, owner);

    expect(result).toStrictEqual(addedReply);
    expect(mockAddReplyValidator.validate).toBeCalledWith(AddReplyPayload);
    expect(mockReplyrepository.addReply).toBeCalledWith(addReply, threadId, commentId, owner);
    expect(mockThreadRepository.checkThreadById).toBeCalledWith(threadId);
    expect(mockCommentRepository.checkCommentByIdAndThreadId).toBeCalledWith(threadId, commentId);
  });
});
