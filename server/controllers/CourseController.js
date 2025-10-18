import Course from '../models/Course.js';

export default class CourseController {
  static async create(req, res) {
    try {
      const { name, credits, enrollment_limit } = req.body;

      // Simple validation
      if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing course name' });
      }
      const creditsNum = Number(credits);
      const limitNum = Number(enrollment_limit);

      if (!Number.isInteger(creditsNum) || creditsNum <= 0) {
        return res.status(400).json({ error: 'Credits must be an integer > 0' });
      }
      if (!Number.isInteger(limitNum) || limitNum < 0) {
        return res.status(400).json({ error: 'Enrollment limit must be an integer >= 0' });
      }

      const course = new Course({
        name: name.trim(),
        credits: creditsNum,
        enrollment_limit: limitNum,
      });

      const saved = await course.save();
      res.status(201).json(saved);
    } catch (err) {
      console.error('Course create error:', err);
      res.status(500).json({ error: 'Server error creating course' });
    }
  }

  static async list(req, res) {
    try {
      const courses = await Course.findAll();
      res.json(courses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async getById(req, res) {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) return res.status(404).json({ error: 'Course not found' });
      res.json(course);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async deleteById(req, res) {
    console.log("calling deleteById course");
    console.log("Incoming deleteById data:", "id:", req.params.id);

    try {
      const course = await Course.delete(req.params.id);

      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      res.json({
        message: "Course deleted successfully",
        course,
      });
    } catch (err) {
      console.error("Error deleting course:", err.message);
      res.status(500).json({ error: "Server error" });
    }
  }

  static async updateCourse(req, res) {
    console.log("calling update course");
    console.log("Incoming update data:", req.params.id);
    try {
      const course = await Course.update(req.params.id);
      if (!course) return res.status(404).json({ error: 'Course not found' });
      res.json(course);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }
}
