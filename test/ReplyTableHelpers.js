const pool = require('../src/Infratructures/database/postgres/pool');

const ReplyTableHelpers = {
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
