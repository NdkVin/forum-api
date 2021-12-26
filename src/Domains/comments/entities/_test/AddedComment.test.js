const AddedComment = require('../AddedComment');

describe('AddedComment', () => {
  it('should return error when send empty payload', () => {
    const payload = {};

    expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should return error when send incomplete payload', () => {
    const payload = {
      id: 'id',
      content: 'content',
    };

    expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should return error when send incorrect datatype on payload', () => {
    const payload = {
      id: 'id',
      content: 'content',
      owner: true,
    };

    expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPEC');
  });
});
