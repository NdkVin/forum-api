/* istanbul ignore file */
/* eslint-disable object-curly-newline */

const pool = require('../src/Infratructures/database/postgres/pool');

const CommentTableHelpers = {
  async addComment({
    id = 'comment-123', content = 'ini content', date = '27-12-21', is_delete = false, owner = 'user-123', thread_id = 'thread-123',
  }) {
    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, content, date, is_delete, owner, thread_id],
    };

    await pool.query(query);
  },

  async getCommentById(id = 'comment-123') {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('TRUNCATE TABLE comments CASCADE');
  },
};

module.exports = CommentTableHelpers;
