import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";

export default function StudentDashboard({ user }) {
  console.log("user in Stuent dashboard", user)
  const endpoint = `${process.env.REACT_APP_API_URL}`;
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState([]);

  // const handleDeleteUser = async (id) => {
  //   console.log("delete user id", id)
  //   if (!window.confirm("Are you sure you want to delete this user?")) return;
  //   const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
  //   console.log(res);
  //   fetchUsers();
  // };

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, []);

  async function fetchCourses() {
    const res = await axios.get(`${endpoint}/api/courses`);
    setCourses(res.data);
  }
  
  async function fetchEnrollments() {
    console.log("fetching enrollments", `${endpoint}/api/enrollments/${user.id}`);
    const res = await axios.get(`${endpoint}/api/enrollments/${user.id}`);
    console.log("fetchEnrollments res.data", res.data);
    setEnrolled(res.data);
  }
  // TODO fix enroll student
  async function handleEnroll(courseId) {
    await axios.post(`${endpoint}/enrollments`, {
      student_id: user.id,
      course_id: courseId,
    });
    fetchEnrollments();
  }

  async function handleDrop(courseId) {
    console.log("handleDrop called", courseId)
    if (!window.confirm("Are you sure you want to drop this course?")) return;
    const res = await fetch(`${endpoint}/api/enrollments/${courseId}`, { method: "DELETE" });
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
                onClick={() => handleEnroll(c.id)}
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
              {e.course_name} — Grade: {e.grade || 'N/A'}
              </span>
              <button
                onClick={() => handleDrop(e.id)}
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