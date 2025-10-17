import { useState, useEffect } from 'react';
import AddCourse from './AddCourse';
import axios from 'axios';
import { Box, TextField, Button, Typography, Container } from "@mui/material";

export default function TeacherDashboard({ user }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    const res = await axios.get('http://localhost:9000/api/courses');
    setCourses(res.data);
  }

  return (
    <div>
      <section className="mb-6">
        <Button type="submit" variant="contained" size="large">
          Add Course
        </Button>
        <AddCourse onCourseAdded={() => fetchCourses()} />
      </section>

      <section className="mb-6">
        <h3 className="font-semibold text-xl mb-2">All Courses</h3>
         <ul>
          {courses.map(c => (
            <li key={c.id}>
              {c.name} — {c.credits} credits — limit {c.enrollment_limit}
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-6">
        <Button type="submit" variant="contained" size="large">
          Manage Users
        </Button>
      </section>
    </div>
  );
}
