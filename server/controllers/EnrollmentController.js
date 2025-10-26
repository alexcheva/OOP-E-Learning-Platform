import Enrollment from "../models/Enrollment.js";

export default class EnrollmentController {
  static async getAll(req, res) {
    console.log("EnrollementController GetAll called")
    try {
      const enrollments = await Enrollment.getAll();
      // const enrollments = await Enrollment.getCourseAndEnrollment();
      res.json(enrollments);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }

  static async getById(req, res) {
    try {
      const enrollement = await Enrollment.findById(req.params.id);
      if (!enrollement) return res.status(404).json({ error: 'Course not found' });
      res.json(enrollement);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async create(req, res) {
    console.log("calling create enrollment");
    try {
      const { student_id, course_id } = req.body;
      console.log("enrollment create called", req.body);

      if (!student_id || !course_id) {
        return res.status(400).json({ error: "Missing student or course" });
      }

      const newEnrollment = new Enrollment({
        student_id: student_id,
        course_id: course_id,
      });

      console.log("newEnrollment", newEnrollment);

      const enrollment = await newEnrollment.add();
      console.log("enrollment",enrollment)
      res.status(201).json(enrollment);

    } catch (err) {
      console.error("Error in addEnrollment:", err.message);
      res.status(500).json({ error: "Server error" });
    }
  }

  static async delete(req, res) {
    try {
      const enrollment = await Enrollment.delete(req.params.id);
      if (!enrollment) return res.status(404).json({ error: "Not found" });
      res.json(enrollment);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }
}
