import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Box, Button } from "@mui/material";

export default function TeacherDashboard({ user }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const res = await axios.get('http://localhost:9000/api/users');
    console.log("TeacherDashboard fetchUsers res:", res)
    setUsers(res.data);
  }
  console.log(users);

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
        to="/"
        >
          Edit Users
        </Button>
        <h3 className="font-semibold text-xl mb-2">All Users</h3>
         <ul>
          {users.map(u => (
            <li key={u.id}>
              {u.name} — {u.email} — role {u.student} - major: {u.major}
            </li>
          ))}
        </ul>

      </Box>
    </div>
  );
}
