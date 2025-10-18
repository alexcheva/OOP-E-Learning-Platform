import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Container,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const res = await fetch("http://localhost:9000/api/courses");
    const data = await res.json();
    setCourses(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } else {
      alert("Failed to delete course");
    }
  };

  const handleEdit = (id) => {
    alert(`Edit course ${id} (you can expand this later with a modal form)`);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        All Courses
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "primary.main" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>ID</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Credits</TableCell>
              <TableCell sx={{ color: "white" }}>Enrollment Limit</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.id}</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.credits}</TableCell>
                <TableCell>{course.enrollment_limit}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(course.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(course.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {courses.length === 0 && (
        <Box textAlign="center" mt={3}>
          <Typography>No courses available.</Typography>
        </Box>
      )}
    </Container>
  );
}
