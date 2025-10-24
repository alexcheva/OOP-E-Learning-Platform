import { pool } from '../db.js';

export default class Course {
  constructor({ id = null, name, credits, enrollment_limit, total_enrolled, created_at = null }) {
    this.id = id;
    this.name = name;
    this.credits = credits;
    this.enrollment_limit = enrollment_limit;
    this.created_at = created_at;
    this.total_enrolled = total_enrolled;
  }

  static async findAll() {
    const res = await pool.query('SELECT * FROM courses ORDER BY id');
    return res.rows.map(r => new Course(r));
  }
// TODO map object by course id
// add enrollment information
  static async findEnrolled() {
    const res = await pool.query(
      `
      SELECT 
        c.id,
        c.name,
        c.credits,
        COUNT(e.id) AS total_enrolled,
        c.enrollment_limit
      FROM courses c
      LEFT JOIN enrollments e ON c.id = e.course_id
      GROUP BY c.id, c.name, c.credits, c.enrollment_limit
      ORDER BY c.id
      `)
    return res.rows.map(r => new Course(r));
  }

  static async findEnrollment() {
    const res = await pool.query(
      `SELECT * FROM courses LEFT JOIN enrollments ON courses.id = enrollments.course_id LEFT JOIN users u ON enrollments.student_id = u.id'
    `);
    return res.rows.map(r => new Course(r));
  }

  

  static async findById(id) {
    const res = await pool.query('SELECT * FROM courses WHERE id = $1', [id]);
    if (!res.rows.length) return null;
    return new Course(res.rows[0]);
  }

  async save() {
    const res = await pool.query(
      `INSERT INTO courses (name, credits, enrollment_limit)
       VALUES ($1, $2, $3) RETURNING *`,
      [this.name, this.credits, this.enrollment_limit]
    );
    const row = res.rows[0];
    this.id = row.id;
    this.created_at = row.created_at;
    return new Course(row);
  }

  static async update(id, { name, credits, enrollment_limit }) {
    console.log("update in COURSE CALLED")
    try {
        const res = await pool.query(
        `UPDATE courses SET name = $1, credits = $2, enrollment_limit = $3
        WHERE id = $4 RETURNING *`,
        [name, credits, enrollment_limit, id]
      );

      // If no course was updated, return null
      return res.rows[0] || null;

    } catch (error) {
      console.error("Error updating course:", error.message);
      throw error;
    }
  }

  static async delete(id) {
    console.log("DELETE in COURSE CALLED");
    const res = await pool.query('DELETE FROM courses WHERE id = $1', [id]);
    console.log("DELETE IN COURSE JS RES:", res)
     // return the deleted row (or null if not found)
    return result.rows[0] || null;
  }
}
