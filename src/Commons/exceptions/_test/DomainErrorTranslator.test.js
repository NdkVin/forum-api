const DomainErrorTranslator = require('../DomainErrorTranslator');
const InvariantError = require('../InvariantError');

describe('DomainErrorTranslator', () => {
  it('should translate error correctly', () => {
    expect(DomainErrorTranslator.translate(new InvariantError('AUTH_USER.NOT_COMPLETE')))
      .toStrictEqual(new InvariantError('tidak dapat melakukan authentikasi karena properti yang dikirimkan tidak lengkap'));
    expect(DomainErrorTranslator.translate(new InvariantError('AUTH_USER.NOT_MATCHING_DATA_TYPE')))
      .toStrictEqual(new InvariantError('tidak dapat melakukan authentikasi karena tipe data pada properti yang dikirimkan tidak sesuai'));
  });

  it('should return original error', () => {
    const error = new Error('some_of_error');

    const translatedError = DomainErrorTranslator.translate(error);

    expect(translatedError).toStrictEqual(error);
  });
});
