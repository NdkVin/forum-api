const AddedThread = require('../AddedThread');

describe('AddedThread', () => {
  it('should throw error when send incomplete payload', () => {
    const payload = {
      id: 'thread-123',
    };

    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when send incorrect data type in payload', () => {
    const payload = {
      id: 'thread-123',
      title: '123',
      owner: true,
    };

    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPEC');
  });

  it('should return payload correctly', () => {
    const payload = {
      id: 'thread-123',
      title: '123',
      owner: 'owner',
    };

    const addedThread = new AddedThread(payload);

    expect(addedThread.id).toStrictEqual(payload.id);
    expect(addedThread.title).toStrictEqual(payload.title);
    expect(addedThread.owner).toStrictEqual(payload.owner);
  });
});
