const pool = require('../src/Infratructures/database/postgres/pool');

const ThreadsTableHelpers = {
  async getThreadById(id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows[0];
  },

  async cleanTable() {
    await pool.query('TRUNCATE TABLE threads CASCADE');
  },
};

module.exports = ThreadsTableHelpers;
