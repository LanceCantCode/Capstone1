const pool = require('../config/database');

class AdminModel {
  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM admins WHERE email = ?', [email]);
    return rows[0];
  }

  static async create(email, hashedPassword) {
    const [result] = await pool.query('INSERT INTO admins (email, password) VALUES (?, ?)', [email, hashedPassword]);
    return result;
  }
}

module.exports = AdminModel;
