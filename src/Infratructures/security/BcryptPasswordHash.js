const PasswordHash = require('../../Applications/security/PasswordHash');

class BcryptPasswordHash extends PasswordHash {
  constructor(bcrypt, saltRount = 10) {
    super();
    this._bcrypt = bcrypt;
    this._saltRound = saltRount;
  }

  async hash(password) {
    return this._bcrypt.hash(password, this._saltRound);
  }
}

module.exports = BcryptPasswordHash;
