const CommentRepository = require('../../Domains/comments/CommentRepository');
const InvariantError = require('../../Commons/exceptions/InvariantError');

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();

    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment(payload, owner, thread_id) {
    const id = `comment-${this._idGenerator(16)}`;
    const date = new Date().toISOString();
    const { content } = payload;
    const is_delete = false;

    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6) RETURNING id, content, owner',
      values: [id, content, date, is_delete, owner, thread_id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('tidak dapat menambahkan comment');
    }

    return result.rows[0];
  }
}

module.exports = CommentRepositoryPostgres;
