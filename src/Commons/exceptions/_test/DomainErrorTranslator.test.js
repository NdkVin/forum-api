const DomainErrorTranslator = require('../DomainErrorTranslator');
const InvariantError = require('../InvariantError');

describe('DomainErrorTranslator', () => {
  it('should translate error correctly', () => {
    expect(DomainErrorTranslator.translate(new InvariantError('AUTH_USER.NOT_COMPLETE')))
      .toStrictEqual(new InvariantError('tidak dapat melakukan authentikasi karena properti yang dikirimkan tidak lengkap'));
    expect(DomainErrorTranslator.translate(new InvariantError('AUTH_USER.NOT_MATCHING_DATA_TYPE')))
      .toStrictEqual(new InvariantError('tidak dapat melakukan authentikasi karena tipe data pada properti yang dikirimkan tidak sesuai'));
    expect(DomainErrorTranslator.translate(new InvariantError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('tidak dapat membuat thread baru karena data yang dikirim tidak lengkap'));
    expect(DomainErrorTranslator.translate(new InvariantError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPEC')))
      .toStrictEqual(new InvariantError('tidak dapat membuat thread baru karena data yang dikirim tidak sesuai'));
    expect(DomainErrorTranslator.translate(new InvariantError('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('tidak dapat menambahkan comment karena data yang dikirimkan tidak lengkap'));
    expect(DomainErrorTranslator.translate(new InvariantError('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPEC')))
      .toStrictEqual(new InvariantError('tidak dapat membuat comment karena tipe data yang dikirimkan tidak sesuai'));
    expect(DomainErrorTranslator.translate(new InvariantError('ADDED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('tidak dapat menambahkan reply karena data yang dikirimkan tidak lengkap'));
    expect(DomainErrorTranslator.translate(new InvariantError('ADDED_REPLY.NOT_MEET_DATA_TYPE_SPEC')))
      .toStrictEqual(new InvariantError('tidak dapat membuat reply karena tipe data yang dikirimkan tidak sesuai'));
  });

  it('should return original error', () => {
    const error = new Error('some_of_error');

    const translatedError = DomainErrorTranslator.translate(error);

    expect(translatedError).toStrictEqual(error);
  });
});
