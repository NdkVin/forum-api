const ReplyReplyRepository = require('../ReplyRepository');

describe('ReplyReplyRepository', () => {
  it('should return error when directly call ReplyReplyRepository method', async () => {
    const replyReplyRepository = new ReplyReplyRepository();

    await expect(() => replyReplyRepository.addReply({}, '', '', ''))
      .rejects.toThrowError('REPLY_REPOSITORY_METHOD.NOT_IMPLEMENTED');
  });
});
