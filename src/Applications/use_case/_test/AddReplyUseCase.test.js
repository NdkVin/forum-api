const AddReplyValidator = require('../../validator/AddReplyValidator');
const AddReply = require('../../../Domains/replies/entities/AddReply');
const AddedReply = require('../../../Domains/replies/entities/AddedReply');
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

    mockAddReplyValidator.validate = jest.fn()
      .mockImplementation(() => Promise.resolve);
    mockReplyrepository.addReply = jest.fn()
      .mockImplementation(() => Promise.resolve(AddReplyResponse));

    const addReplyUseCase = new AddReplyUseCase({
      validator: mockAddReplyValidator,
      replyRepository: mockReplyrepository,
    });

    const result = await addReplyUseCase.execute(AddReplyPayload, threadId, commentId, owner);

    expect(result).toStrictEqual(addedReply);
    expect(mockAddReplyValidator.validate).toBeCalledWith(AddReplyPayload);
    expect(mockReplyrepository.addReply).toBeCalledWith(addReply, threadId, commentId, owner);
  });
});
