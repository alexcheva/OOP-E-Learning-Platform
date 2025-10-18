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
import EditCourseModal from "../components/EditCourseModal";
import DeleteCourseModal from "../components/DeleteCourseModal";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // console.log(courses);
  console.log(selectedCourse);

  const fetchCourses = async () => {
    const res = await fetch("http://localhost:9000/api/courses");
    const data = await res.json();
    setCourses(data);
  };

  const handleDeleteOpen = async (course_id) => {
    setSelectedCourse(course_id);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async (id) => {
    console.log("handleDeleteConfirm", id)
    await fetch(`http://localhost:9000/api/courses/${id}`, { method: "DELETE" });
    setIsDeleteOpen(false);
    fetchCourses();
  };

  const handleEditOpen = (course_id) => {
    setSelectedCourse(course_id);
    setIsEditOpen(true);
  };

  const handleEditSave = async (course) => {
    console.log("Save edit clicked!", course, course.id,JSON.stringify(course),JSON.stringify({
          name: course.name,
          credits: course.credits,
          enrollment_limit: course.enrollment_limit,
          }));
    try {

      const response = await fetch(`http://localhost:9000/api/courses/${course.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: course.name,
          credits: course.credits,
          enrollment_limit: course.enrollment_limit,
          }),
        });
      
      const data = await response.json();
      if (response.ok) {
        console.log("✅ Updated course:", data.course);
      } else {
        console.error("❌ Error:", data.message);
      }
    } catch (error) {
      console.error("Update failed:", error);
    }

    setIsEditOpen(false);
    console.log("fetching courses");
    fetchCourses();
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
                  <IconButton color="primary" onClick={() => {
                    console.log("edit button clicked", course.id);
                    handleEditOpen(course.id);
                    }}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteOpen(course.id)}>
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

    <DeleteCourseModal
      open={isDeleteOpen}
      course={courses[selectedCourse-1]}
      onClose={() => setIsDeleteOpen(false)}
      onConfirm={handleDeleteConfirm}
    />

    <EditCourseModal
      open={isEditOpen}
      course={courses[selectedCourse-1]}
      onClose={() => setIsEditOpen(false)}
      onSave={handleEditSave}
    />

    </Container>
  );
}
