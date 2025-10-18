import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Box, Button } from "@mui/material";

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
        to="/courses">
          Grades
        </Button>
      </Box>
      <Box sx={{ m: 2, }}>
        <Button type="submit" variant="contained" size="large">
          Edit Users
        </Button>
      </Box>
    </div>
  );
}
