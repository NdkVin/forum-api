/* eslint-disable object-curly-newline */
const pool = require('../src/Infratructures/database/postgres/pool');

const ThreadsTableHelpers = {
  async addThread({ id = 'thread-123', title = 'ini title', body = 'ini body', owner = 'user-123', date = '27-12-21' }) {
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5)',
      values: [id, title, body, owner, date],
    };

    await pool.query(query);
  },

  async getThreadById(id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows;
  },

  async cleanTable() {
    await pool.query('TRUNCATE TABLE threads CASCADE');
  },
};

module.exports = ThreadsTableHelpers;
