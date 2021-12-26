const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const InvariantError = require('../../Commons/exceptions/InvariantError');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(payload, owner) {
    const id = `thread-${this._idGenerator(16)}`;
    const date = new Date().toISOString();
    const { title, body } = payload;
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5) RETURNING id, title, owner',
      values: [id, title, body, owner, date],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('tidak dapat menambahkan thread');
    }

    return result;
  }
}

module.exports = ThreadRepositoryPostgres;
