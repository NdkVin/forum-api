/* eslint-disable object-curly-newline */

const pool = require('../src/Infratructures/database/postgres/pool');

const CommentTableHelpers = {
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
