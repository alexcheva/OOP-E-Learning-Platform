import {pool} from "../db.js";

export default class Enrollment {
  constructor({ id = null, student_id, course_id, enrolled_at = null }) {
    this.id = id;
    this.student_id = student_id;
    this.course_id = course_id;
    this.enrolled_at = enrolled_at;
  }

  static async getAll() {
    console.log("enrollement getAll called")
    const { rows } = await pool.query(`
      SELECT e.*, u.name AS student_name, c.name AS course_name
      FROM enrollments e
      JOIN users u ON e.student_id = u.id
      JOIN courses c ON e.course_id = c.id
    `);
    console.log("enrollment", rows);
    return rows;
  }
  
  static async getCourseAndEnrollment() {
    console.log("enrollement getCourseAndEnrollment called")
    const { rows } = await pool.query(`
     SELECT * FROM courses LEFT JOIN enrollments ON courses.id = enrollments.course_id
    JOIN users u ON enrollments.student_id = u.id
    `);

    const enrollmentData = {
    };

    for (const value of rows) {
      if (!(value.course_id in enrollmentData)) {
        enrollmentData[value.course_id] = {
          id: value.course_id,
          students: [
            {
              student_name: value.name,
              student_id: value.student_id,
              grade: value.grade,
            }
          ]
        }
      } else {
        enrollmentData[value.course_id].students.push({
              student_name: value.name,
              student_id: value.student_id,
              grade: value.grade,
            })
      }
    }
    console.log("enrollmentData", enrollmentData);
    return enrollmentData;
  }

  static async findById(id) {
    const res = await pool.query('SELECT * FROM courses WHERE id = $1', [id]);
    if (!res.rows.length) return null;
    return new Course(res.rows[0]);
  }

  static async create({ student_id, course_id }) {
    const { rows } = await pool.query(
      `INSERT INTO enrollments (student_id, course_id, enrolled_at)
       VALUES ($1, $2, NOW()) RETURNING *`,
      [student_id, course_id]
    );
    return rows[0];
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM enrollments WHERE id = $1 RETURNING *`,
      [id]
    );
    return rows[0];
  }
  
}