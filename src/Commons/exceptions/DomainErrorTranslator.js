const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'AUTH_USER.NOT_COMPLETE': new InvariantError('tidak dapat melakukan authentikasi karena properti yang dikirimkan tidak lengkap'),
  'AUTH_USER.NOT_MATCHING_DATA_TYPE': new InvariantError('tidak dapat melakukan authentikasi karena tipe data pada properti yang dikirimkan tidak sesuai'),
};

module.exports = DomainErrorTranslator;
