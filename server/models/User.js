import { pool } from '../db.js';

export default class User {
  constructor({ id = null, name, email, password, role, major = null }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.major = major;
  }

  static async findAll() {
    console.log("Users.js findAll is called");
    const res = await pool.query('SELECT * FROM users ORDER BY id');
    return res.rows.map(r => new User(r));
  }

  static async findById(id) {
    const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (!res.rows.length) return null;
    return new User(res.rows[0]);
  }

  static async delete(id) {
    console.log("DELETE in USER CALLED");
    const res = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    console.log("DELETE IN USER JS RES:", res)
     // return the deleted row (or null if not found)
    return res.rows[0] || null;
  }
}