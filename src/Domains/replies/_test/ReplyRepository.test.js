const ReplyReplyRepository = require('../ReplyRepository');

describe('ReplyReplyRepository', () => {
  it('should return error when directly call ReplyReplyRepository method', async () => {
    const replyReplyRepository = new ReplyReplyRepository();

    await expect(() => replyReplyRepository.addReply({}, '', '', ''))
      .rejects.toThrowError('REPLY_REPOSITORY_METHOD.NOT_IMPLEMENTED');
    await expect(() => replyReplyRepository.checkReplyOwner('', ''))
      .rejects.toThrowError('REPLY_REPOSITORY_METHOD.NOT_IMPLEMENTED');
    await expect(() => replyReplyRepository.checkReply('', '', ''))
      .rejects.toThrowError('REPLY_REPOSITORY_METHOD.NOT_IMPLEMENTED');
    await expect(() => replyReplyRepository.deleteReply(''))
      .rejects.toThrowError('REPLY_REPOSITORY_METHOD.NOT_IMPLEMENTED');
  });
});
