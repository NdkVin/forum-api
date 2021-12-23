const AddThread = require('../AddThread');

describe('AddComent', () => {
  it('should return add coment payload', () => {
    const payload = {
      title: 'andika',
      body: 'andika',
    };

    const addThread = new AddThread(payload);

    expect(addThread.title).toEqual(payload.title);
    expect(addThread.body).toEqual(payload.body);
  });
});
