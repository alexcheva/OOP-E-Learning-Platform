import { useEffect, useState } from 'react';
import axios from 'axios';

export default function StudentDashboard({ user }) {
  const endpoint = `${process.env.REACT_APP_API_URL}/api`;
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState([]);

  useEffect(() => {
    fetchCourses();
    // fetchEnrollments();
  }, []);

  async function fetchCourses() {
    const res = await axios.get(`${endpoint}/courses`);
    setCourses(res.data);
  }

  // async function fetchEnrollments() {
  //   const res = await axios.get(`${endpoint}/enrollments/${user.id}`);
  //   setEnrolled(res.data);
  // }

  // async function handleEnroll(courseId) {
  //   await axios.post(`${endpoint}/enrollments`, {
  //     student_id: user.id,
  //     course_id: courseId,
  //   });
  //   fetchEnrollments();
  // }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Welcome, {user.name} (Student)
      </h2>

      <section className="mb-6">
        <h3 className="font-semibold text-xl mb-2">My Profile</h3>
        <p>Email: {user.email}</p>
        <p>Major: {user.major}</p>
      </section>

      <section className="mb-6">
        <h3 className="font-semibold text-xl mb-2">Available Courses</h3>
        <ul>
          {courses.map((c) => (
            <li key={c.id} className="flex justify-between items-center">
              <span>
                {c.name} ({c.credits} credits)
              </span>
              {/* <button
                onClick={() => handleEnroll(c.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Enroll
              </button> */}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-xl mb-2">My Enrollments</h3>
        <ul>
          {enrolled.map((e) => (
            <li key={e.id}>
              {e.course_name} — Grade: {e.grade || 'N/A'}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}