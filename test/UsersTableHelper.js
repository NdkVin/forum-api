const pool = require('../src/Infratructures/database/postgres/pool');

const UsersTableHelper = {
  async addUser({
    id = 'test-123', username = 'andika', password = 'password', fullname = 'andika andika',
  }) {
    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4)',
      values: [id, username, password, fullname],
    };

    await pool.query(query);
  },

  async findUserById(id) {
    const query = {
      text: 'SELECT * FROM users WHERE id = id',
      values: [id],
    };

    const result = await pool.query(query);
    return result;
  },
};

module.exports = UsersTableHelper;
