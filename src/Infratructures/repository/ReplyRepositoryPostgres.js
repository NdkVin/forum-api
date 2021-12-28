const ReplyRepository = require('../../Domains/replies/ReplyRepository');
const InvariantError = require('../../Commons/exceptions/InvariantError');

class ReplyRepositoryPostgres extends ReplyRepository {
  constructor(pool, idGenerator) {
    super();

    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addReply(payload, threadId, commentId, owner) {
    const { content } = payload;
    const id = `reply-${this._idGenerator(16)}`;
    const date = new Date().toISOString();
    const is_delete = false;

    const query = {
      text: 'INSERT INTO replies VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id, content, owner',
      values: [id, content, date, is_delete, owner, threadId, commentId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('tidak dapat menambahkan reply');
    }

    return result.rows[0];
  }
}

module.exports = ReplyRepositoryPostgres;
