/* istanbul ignore file */

const pool = require('../src/Infratructures/database/postgres/pool');

const ReplyTableHelpers = {
  async like({
    id = 'like-123', thread_id = 'thread-123', comment_id = 'comment-123', user_id = 'user-123',
  }) {
    const query = {
      text: 'INSERT INTO table_comment_like VALUES($1, $2, $3, $4)',
      values: [id, user_id, thread_id, comment_id],
    };

    await pool.query(query);
  },

  async unlike({
    id = 'like-123', thread_id = 'thread_123', comment_id = 'comment-123', user_id = 'user-123',
  }) {
    const query = {
      text: 'DELETE from table_comment_like WHERE user_id = $1 AND thread_id = $2 AND comment_id = $3',
      values: [id, user_id, thread_id, comment_id],
    };

    await pool.query(query);
  },

  async checkLike({ threadId = 'thread-123', commentId = 'comment-123', userId = 'user-123' }) {
    const query = {
      text: 'SELECT * from table_comment_like where thread_id = $1 AND comment_id = $2 AND user_id = $3',
      values: [threadId, commentId, userId],
    };

    const { rowCount } = await pool.query(query);
    return rowCount;
  },

  async cleanTable() {
    await pool.query('TRUNCATE TABLE table_comment_like CASCADE');
  },
};

module.exports = ReplyTableHelpers;
