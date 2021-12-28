const ReplyRepository = require('../../Domains/replies/ReplyRepository');
const InvariantError = require('../../Commons/exceptions/InvariantError');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');

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

  async checkReplyOwner(replyId, userId) {
    const query = {
      text: 'SELECT owner FROM replies WHERE id = $1',
      values: [replyId],
    };

    const result = await this._pool.query(query);

    const { owner } = result.rows[0];
    if (owner !== userId) {
      throw new AuthorizationError('anda tidak berhak menghapus ini');
    }

    return owner;
  }

  async checkReply(threadId, commentId, replyId) {
    const query = {
      text: 'SELECT * FROM replies WHERE thread_id = $1 AND comment_id = $2 AND id = $3',
      values: [threadId, commentId, replyId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('reply tidak ditemukan');
    }

    return result.rows;
  }

  async deleteReply(replyId) {
    const is_delete = true;
    const query = {
      text: 'UPDATE replies SET is_delete = $1 WHERE id = $2',
      values: [is_delete, replyId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('tidak dapt menghapus reply');
    }
  }

  async getReplyBythreadIdAndCommentId(threadId, replyId) {
    const query = {
      text: 'SELECT replies.id, replies.content, replies.date, users.username, replies.is_delete FROM replies LEFT JOIN users ON replies.owner = users.id WHERE replies.thread_id = $1 AND replies.comment_id = $2 ORDER BY replies.date ASC',
      values: [threadId, replyId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = ReplyRepositoryPostgres;
