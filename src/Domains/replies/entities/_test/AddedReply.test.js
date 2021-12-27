const AddedReply = require('../AddedReply');

describe('AddedReply', () => {
  it('should return error when send empty payload', () => {
    const payload = {};

    expect(() => new AddedReply(payload)).toThrowError('ADDED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should return error when send incomplete payload', () => {
    const payload = {
      id: 'repy-123',
      content: 'ini content',
    };

    expect(() => new AddedReply(payload)).toThrowError('ADDED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should return error when send with incorrect data type payload', () => {
    const payload = {
      id: 'repy-123',
      content: 'ini content',
      owner: true,
    };

    expect(() => new AddedReply(payload)).toThrowError('ADDED_REPLY.NOT_MEET_DATA_TYPE_SPEC');
  });

  it('should return not error and return payload correctly', () => {
    const payload = {
      id: 'repy-123',
      content: 'ini content',
      owner: 'user-123',
    };

    const addedReply = new AddedReply(payload);

    expect(addedReply.id).toEqual(payload.id);
    expect(addedReply.content).toEqual(payload.content);
    expect(addedReply.owner).toEqual(payload.owner);
  });
});
