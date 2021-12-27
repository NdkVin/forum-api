const AddReplay = require('../AddReply');

describe('AddReplay', () => {
  it('should return payload correctly', () => {
    const payload = {
      content: 'ini content',
    };

    const addReplay = new AddReplay(payload);

    expect(addReplay.content).toEqual(payload.content);
  });
});
