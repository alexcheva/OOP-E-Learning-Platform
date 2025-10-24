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

  static async findAllStudents() {
    console.log("Users.js findAllStudents is called");
    const res = await pool.query('SELECT * FROM users WHERE role = $1', ['student']);
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

  static async update(id, { name, email, role, major }) {
    console.log("update in USER CALLED")
    try {
        const res = await pool.query(
        `UPDATE users SET name = $1, email = $2 , role = $3, major = $4
        WHERE id = $5 RETURNING *`,
        [name, email, role, major, id]
      );
      
      // If no user was updated, return null
      return res.rows[0] || null;

    } catch (error) {
      console.error("Error updating user:", error.message);
      throw error;
    }
  }

  async add() {
    console.log("add NEW USER CALLED")
    try {
      const res = await pool.query(
        "INSERT INTO users (name, email, password, role, major) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [this.name, this.email, this.password, this.role, this.major || null]
      );
      // res.status(201).json(res.rows[0]);
      return res.rows[0];
    } catch (err) {
      console.error("Error adding user:", error.message);
      throw error;
    }
  }
}