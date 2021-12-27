const CommentRepository = require('../../Domains/comments/CommentRepository');
const InvariantError = require('../../Commons/exceptions/InvariantError');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');

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

  async deleteComment(thread_id, comment_id) {
    const isDelete = true;

    const query = {
      text: 'UPDATE comments SET is_delete = $1 WHERE id = $2 AND thread_id = $3',
      values: [isDelete, comment_id, thread_id],
    };

    const reuslt = await this._pool.query(query);

    if (!reuslt.rowCount) {
      throw new InvariantError('tidak dapat menghapus comment');
    }
  }

  async checkCommentOwner(user_id, comment_id) {
    const query = {
      text: 'SELECT owner FROM comments WHERE id = $1',
      values: [comment_id],
    };

    const result = await this._pool.query(query);

    const { owner } = result.rows[0];

    if (owner !== user_id) {
      throw new AuthorizationError('Anda tidak memiliki hak untuk menghapus ini');
    }

    return owner;
  }

  async getCommentByIdAndThreadId(thread_id, comment_id) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1 AND thread_id = $2',
      values: [comment_id, thread_id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Comment tidak ditemukan');
    }

    return result.rows;
  }
}

module.exports = CommentRepositoryPostgres;
