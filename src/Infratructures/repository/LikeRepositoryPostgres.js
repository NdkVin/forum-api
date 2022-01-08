const LikeRepository = require('../../Domains/likes/LikeRepository');

class LikeRepositoryPostgres extends LikeRepository {
  constructor(pool, idGenerator) {
    super();

    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async checkLike(threadId, commentId, userId) {
    const query = {
      text: 'SELECT * from table_comment_like where thread_id = $1 AND comment_id = $2 AND user_id = $3',
      values: [threadId, commentId, userId],
    };

    const { rowCount } = await this._pool.query(query);
    return rowCount;
  }

  async like(threadId, commentId, userId) {
    const id = `like-${this._idGenerator(16)}`;
    const query = {
      text: 'INSERT INTO table_comment_like VALUES($1, $2, $3, $4)',
      values: [id, userId, threadId, commentId],
    };

    await this._pool.query(query);

    return 'like';
  }

  async unlike(threadId, commentId, userId) {
    const query = {
      text: 'DELETE from table_comment_like WHERE user_id = $1 AND thread_id = $2 AND comment_id = $3',
      values: [userId, threadId, commentId],
    };

    await this._pool.query(query);

    return 'unlike';
  }

  async countLike(threadId) {
    const query = {
      text: 'SELECT COUNT(id), comment_id FROM table_comment_like WHERE thread_id = $1 GROUP BY comment_id ORDER BY comment_id ASC',
      values: [threadId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = LikeRepositoryPostgres;
