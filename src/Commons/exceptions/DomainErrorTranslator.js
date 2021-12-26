const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'AUTH_USER.NOT_COMPLETE': new InvariantError('tidak dapat melakukan authentikasi karena properti yang dikirimkan tidak lengkap'),
  'AUTH_USER.NOT_MATCHING_DATA_TYPE': new InvariantError('tidak dapat melakukan authentikasi karena tipe data pada properti yang dikirimkan tidak sesuai'),
  'ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat thread baru karena data yang dikirim tidak lengkap'),
  'ADDED_THREAD.NOT_MEET_DATA_TYPE_SPEC': new InvariantError('tidak dapat membuat thread baru karena data yang dikirim tidak sesaui'),
};

module.exports = DomainErrorTranslator;
