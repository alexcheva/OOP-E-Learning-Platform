import { useEffect, useState } from 'react';
import { globals } from "../utils/globals";
// import { Link } from "react-router-dom";
// import { Box, Button } from "@mui/material";
import { dropUser, enrollUser } from "../utils/api";

export default function StudentDashboard({ user }) {
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  // TODO
  // delete user
  // edit user

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, []);

  async function fetchCourses() {
  try {
      const courses = await globals.fetchCourses();
      console.log("courses", courses)
      setCourses(courses);
    } catch (err) {
      console.error("Error loading courses:", err);
    }
  }
  
  async function fetchEnrollments() {
  try {
      const enrollments = await globals.fetchEnrollments(user.id);
      console.log("enrollments", enrollments);
      setEnrolled(enrollments);
    } catch (err) {
      console.error("Error loading courses:", err);
    }
  }

  async function handleEnroll(userId, courseId) {
    try {
      await enrollUser(userId, courseId);
      alert("Enrolled successfully!");
    } catch (err) {
      alert("Error" + err.message);
    }
    fetchEnrollments();
  }

  async function handleDrop(enrollment_id) {
    try {
      await dropUser(enrollment_id);
      alert("Dropped successfully!");
    } catch (err) {
      alert("Error" + err.message);
    }
    fetchEnrollments();
  }

  return (
    <div>
      <section className="mb-6">
        <h3 className="font-semibold text-xl mb-2">My Profile</h3>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Major: {user.major}</p>
        <button
          onClick={() => console.log("edit user button clicked")}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => console.log("delete user button clicked")}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
        Delete
      </button>
      </section>

      <section className="mb-6">
        <h3 className="font-semibold text-xl mb-2">Available Courses</h3>
        <ul>
          {courses.map((c) => (
            <li key={c.id} className="flex justify-between items-center">
              <span>
                {c.name} ({c.credits} credits)
              </span>
              <button
                onClick={() => {
                  handleEnroll(user.id, c.id);
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Enroll
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-xl mb-2">My Enrollments</h3>
        <ul>
          {enrolled.map((e) => (
            <li key={e.id}>
              <span>
              {e.id} - {e.course_name} — Grade: {e.grade || 'N/A'}
              </span>
              <button
                onClick={() => {
                  handleDrop(e.enrollment_id);
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Drop
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}