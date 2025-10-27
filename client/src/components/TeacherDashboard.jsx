import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Box, Button } from "@mui/material";

export default function TeacherDashboard({ user }) {
  const [users, setUsers] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  const enrollmentData = [
    {"id":1,
    "student_id":1,
    "course_id":1,
    "grade":"Null",
    "student_name":
    "Alexandra Lukinicheva",
    "course_name":"Intro to JavaScript"}]

  useEffect(() => {
    fetchUsers();
    fetchEnrollments();
  }, []);

  async function fetchUsers() {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`);
    console.log("TeacherDashboard fetchUsers res:", res)
    setUsers(res.data);
  }
  // console.log(users);

    async function fetchEnrollments() {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/enrollments`);
    console.log("TeacherDashboard fetchEnrollments res:", res)
    setEnrollments(res.data);
  }
  console.log("enrollments",enrollments);

  return (
    <div>
      <Box sx={{ m: 2, }}>
        <Button type="submit" variant="contained" size="large"
        component={Link}
        to="/add-course">
          Add Course
        </Button>
      </Box>
      <Box sx={{ m: 2, }}>
        <Button type="submit" variant="contained" size="large"
        component={Link}
        to="/courses">
          Course Management
        </Button>
      </Box>
      <Box sx={{ m: 2, }}>
        <Button type="submit" variant="contained" size="large"
        component={Link}
        to="/"
        >
          Grades
        </Button>
      </Box>
      <Box sx={{ m: 2, }}>
        <Button type="submit" variant="contained" size="large"
        component={Link}
        to="/users"
        >
          Edit Users
        </Button>
      </Box>
    </div>
  );
}
