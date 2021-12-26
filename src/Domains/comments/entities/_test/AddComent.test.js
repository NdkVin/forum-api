const AddComment = require('../AddComment');

describe('AddComent', () => {
  it('should return add coment payload', () => {
    const payload = {
      content: 'this is content',
    };

    const addComment = new AddComment(payload);

    expect(addComment.content).toEqual(payload.content);
  });
});
