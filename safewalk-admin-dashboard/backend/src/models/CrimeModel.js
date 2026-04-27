const pool = require('../config/database');

class CrimeModel {
  static async getActiveCrimes() {
    const [rows] = await pool.query('SELECT * FROM crimes WHERE status = "active" ORDER BY timestamp DESC');
    return rows;
  }

  static async getAllCrimes() {
    const [rows] = await pool.query('SELECT * FROM crimes ORDER BY timestamp DESC');
    return rows;
  }

  static async getArchivedCrimes() {
    const [rows] = await pool.query('SELECT * FROM crimes WHERE status = "archived" ORDER BY timestamp DESC');
    return rows;
  }

  static async create(latitude, longitude, crimeType, timestamp) {
    const [result] = await pool.query(
      'INSERT INTO crimes (latitude, longitude, crime_type, timestamp, status) VALUES (?, ?, ?, ?, "active")',
      [latitude, longitude, crimeType, timestamp]
    );
    return result;
  }

  static async update(id, latitude, longitude, crimeType, timestamp) {
    const [result] = await pool.query(
      'UPDATE crimes SET latitude = ?, longitude = ?, crime_type = ?, timestamp = ? WHERE id = ?',
      [latitude, longitude, crimeType, timestamp, id]
    );
    return result;
  }

  static async archive(id) {
    const [result] = await pool.query('UPDATE crimes SET status = "archived" WHERE id = ?', [id]);
    return result;
  }

  static async restore(id) {
    const [result] = await pool.query('UPDATE crimes SET status = "active" WHERE id = ?', [id]);
    return result;
  }

  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM crimes WHERE id = ?', [id]);
    return rows[0];
  }

  static async getStatistics() {
    const [activeCrimes] = await pool.query('SELECT COUNT(*) as count FROM crimes WHERE status = "active"');
    const [archivedCrimes] = await pool.query('SELECT COUNT(*) as count FROM crimes WHERE status = "archived"');
    return {
      activeCrimes: activeCrimes[0].count,
      archivedCrimes: archivedCrimes[0].count,
    };
  }

  static async getHighRiskAreas() {
    const [rows] = await pool.query(`
      SELECT latitude, longitude, COUNT(*) as crime_count
      FROM crimes
      WHERE status = "active"
      GROUP BY latitude, longitude
      HAVING COUNT(*) >= 10
      ORDER BY crime_count DESC
    `);
    return rows;
  }

  static async getRecentCrimes(limit = 10) {
    const [rows] = await pool.query(
      'SELECT * FROM crimes WHERE status = "active" ORDER BY timestamp DESC LIMIT ?',
      [limit]
    );
    return rows;
  }
}

module.exports = CrimeModel;
