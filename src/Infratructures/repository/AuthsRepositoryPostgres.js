const InvariantError = require('../../Commons/exceptions/InvariantError');
const AuthsRepository = require('../../Domains/auths/AuthsRepository');

class AuthsRepositoryPostgres extends AuthsRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async addToken(token) {
    const query = {
      text: 'INSERT INTO authentications VALUES($1)',
      values: [token],
    };

    await this._pool.query(query);
  }

  async checkRefreshToken(token) {
    const query = {
      text: 'SELECT * from authentications where token = $1',
      values: [token],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('refresh token tidak valid');
    }
  }

  async deleteToken(token) {
    const query = {
      text: 'DELETE from authentications where token = $1',
      values: [token],
    };

    await this._pool.query(query);
  }
}

module.exports = AuthsRepositoryPostgres;
