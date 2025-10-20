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
// import EditCourseModal from "../components/EditCourseModal";
import EditModal from "./modals/EditModal";
import DeleteCourseModal from "../components/DeleteCourseModal";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  // const [courseFields, setCourseFields] = useState([]);
  const courseFields = [
    { name: "name", label: "Course Name" },
    { name: "credits", label: "Credits", type: "number" },
    { name: "enrollment_limit", label: "Enrollment Limit", type: "number" },
  ];
  const endpoint = "http://localhost:9000/api/courses"
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const fetchCourses = async () => {
    const res = await fetch(endpoint);
    const data = await res.json();
    setCourses(data);
  };

  const handleDeleteOpen = async (course_id) => {
    setSelectedCourse(course_id);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async (id) => {
    console.log("handleDeleteConfirm", id)
    const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    const data = await res.json();
    console.log("returning data", data);
    setIsDeleteOpen(false);
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
                    console.log("selectedCourse", course)
                    setSelectedCourse(course);
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

    {selectedCourse && (
        <EditModal
          isOpen={!!selectedCourse}
          onClose={() => setSelectedCourse(null)}
          entityName="course"
          data={selectedCourse}
          fields={courseFields}
          endpoint={endpoint}
          onSave={()=>fetchCourses()}
        />
      )}

    </Container>
  );
}
