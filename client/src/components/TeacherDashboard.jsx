import { useState, useEffect } from 'react';
import AddCourse from './AddCourse';
import axios from 'axios';

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
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.name} (Teacher)</h2>

      <section className="mb-6">
        <h3 className="font-semibold text-xl mb-2">Add New Course</h3>
        <AddCourse onAdded={() => fetchCourses()} />
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

      <section>
        <h3 className="font-semibold text-xl mb-2">Manage Users</h3>
      </section>
    </div>
  );
}
