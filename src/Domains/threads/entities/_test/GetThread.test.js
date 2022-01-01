const GetThread = require('../GetThread');

describe('GetThread', () => {
  it('should return error when send incomplete payload', () => {
    const payload = {
      id: 'thread-123',
      title: 'ini title',
    };

    expect(() => new GetThread(payload))
      .toThrowError('GET_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should return error when send payload with incorrect data type', () => {
    const payload = {
      id: 'ini id',
      title: true,
      body: true,
      date: 123,
      username: 123,
      comments: [],
    };

    expect(() => new GetThread(payload))
      .toThrowError('GET_THREAD.NOT_MEET_DATA_TYPE_SPEC');
  });

  it('should retuning payload correctly', () => {
    const payload = {
      id: 'ini id',
      title: 'true',
      body: 'true',
      date: '123',
      username: '123',
      comments: [],
    };
    const getThread = new GetThread(payload);

    expect(getThread.id).toEqual(payload.id);
    expect(getThread.title).toEqual(payload.title);
    expect(getThread.body).toEqual(payload.body);
    expect(getThread.date).toEqual(payload.date);
    expect(getThread.username).toEqual(payload.username);
    expect(getThread.comments).toEqual([]);
  });
});
