/* istanbul ignore file */

const pool = require('../src/Infratructures/database/postgres/pool');

const ReplyTableHelpers = {
  async addReply({
    id = 'reply-123', content = 'ini content', date = '27-12-21', is_delete = false, owner = 'user-123', thread_id = 'thread-123', comment_id = 'comment-123',
  }) {
    const query = {
      text: 'INSERT INTO replies VALUES($1, $2, $3, $4, $5, $6, $7)',
      values: [id, content, date, is_delete, owner, thread_id, comment_id],
    };

    await pool.query(query);
  },

  async getRelyById(id = 'reply-123') {
    const query = {
      text: 'SELECT * FROM replies WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows;
  },

  async cleanTable() {
    await pool.query('TRUNCATE TABLE replies CASCADE');
  },
};

module.exports = ReplyTableHelpers;
