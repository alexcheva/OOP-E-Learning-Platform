import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { globals } from "../utils/globals";
import { dropUser, enrollUser } from "../utils/api";

export default function StudentDashboard({ user }) {
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, []);

  async function fetchCourses() {
    try {
      const courses = await globals.fetchCourses();
      setCourses(courses);
    } catch (err) {
      console.error("Error loading courses:", err);
    }
  }

  async function fetchEnrollments() {
    try {
      const enrollments = await globals.fetchEnrollments(user.id);
      setEnrolled(enrollments);
    } catch (err) {
      console.error("Error loading enrollments:", err);
    }
  }

  async function handleEnroll(userId, courseId) {
    try {
      await enrollUser(userId, courseId);
      setSnackbar({ open: true, message: "Enrolled successfully!", severity: "success" });
      fetchEnrollments();
    } catch (err) {
      setSnackbar({ open: true, message: "Alert:" + err.message, severity: "error" });
    }
  }

  async function handleDrop(enrollment_id) {
    const confirmed = window.confirm("Are you sure you want to drop this course?");
    if (!confirmed) return;

    try {
      await dropUser(enrollment_id);
      setSnackbar({ open: true, message: "Dropped successfully!", severity: "success" });
      fetchEnrollments();
    } catch (err) {
      setSnackbar({ open: true, message: "Alert:" + err.message, severity: "error" });
    }
  }

  return (
    <Box  sx={{ mt: 4 }}>
      {/* Profile Section */}
      <Container>
        <Typography variant="h5" gutterBottom>
          My Profile
        </Typography>
        <Paper sx={{ p: 3, mb: 4, position: "relative", borderRadius: 2  }}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Typography variant="h5" gutterBottom>
              Student Profile
            </Typography>

            <Box>
              <IconButton color="primary" onClick={() => console.log("Edit user clicked")}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => console.log("Delete user clicked")}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
          <Divider />
          <Box sx={{mt: 4 }}>
            <Typography fontWeight="bold">Name: {user.name}</Typography>
            <Typography fontWeight="bold">Email: {user.email}</Typography>
            <Typography fontWeight="bold">Major: {user.major}</Typography>
          </Box>
        </Paper>
      </Container>

      {/* Enrollments */}
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          My Enrollments
        </Typography>
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "primary.main" }}>
              <TableRow>
                <TableCell>Enrollment ID</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enrolled.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>{e.id}</TableCell>
                  <TableCell>{e.course_name}</TableCell>
                  <TableCell>{e.grade || "N/A"}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDrop(e.enrollment_id)}
                      >
                      Drop
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Available Courses */}
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Available Courses
        </Typography>

        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "primary.main" }}>
              <TableRow>
                <TableCell>Course Name</TableCell>
                <TableCell>Credits</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.credits}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEnroll(user.id, c.id)}
                      >
                      Enroll
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
