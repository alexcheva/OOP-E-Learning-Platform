import { useState } from "react";
import {
  Button,
  Typography,
  Container,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@mui/material";
import AddEnrollmentModal from "./modals/AddEnrollmentModal";
import DeleteButton from "./buttons/DeleteButton";
import { Add } from "@mui/icons-material";
import EditButton from "./buttons/EditButton";

export default function EnrollmentTable({ enrollment, courses, enrollments, fetchEnrollments, fetchData, users }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedEnrollment, setSelectedEnrollement] = useState(false);
  const endpoint = `${process.env.REACT_APP_API_URL}/api/enrollments`;
  const enrollmentFields = [
    { name: "alex", label: "Student Name" },
    { name: "intro", label: "Course", },
    { name: "A", label: "Grade", },
  ];  
  
  const handleEditClick = (enrollment) => {
    console.log("edit button clicked", enrollment)
    setSelectedEnrollement(enrollment); // pass clicked enrollment to modal
  };

  const handleCloseModal = () => {
    setSelectedEnrollement(null);
  };

  console.log("enrollments",enrollments);
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Manage Enrollments
      </Typography>

      <Button sx={{ mb: 3 }} variant="contained" color="primary" onClick={() => setOpenModal(true)}>
        <Add /> Add Enrollment
      </Button>
      <TableContainer component={Paper} sx={{ borderRadius: 2, mb: 3}}>
        <Table>
          <TableHead sx={{ backgroundColor: "primary.main" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Student</TableCell>
              <TableCell sx={{ color: "white" }}>Course</TableCell>
              <TableCell sx={{ color: "white" }}>Grade</TableCell>
              <TableCell sx={{ color: "white" }}>Edit</TableCell>
              <TableCell sx={{ color: "white" }}>Drop</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {enrollments?.map((e) => (
              <TableRow key={e.id}>
                <TableCell>{e.student_name}</TableCell>
                <TableCell>{e.course_name}</TableCell>
                <TableCell>{e.grade}</TableCell>
                <TableCell>
                  {/* <EditButton item={e} onEdit={handleEditClick} /> */}
                  <EditButton
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                    entityName={"enrollment"}   // e.g. "course", "user", "enrollment"
                    id={e.id}
                    data={e}         // current record to edit
                    fields={enrollmentFields}       // array of { name, label, type }
                    endpoint={endpoint}     // `/api/courses`, `/api/users`, `/api/enrollments`
                    onSave={fetchData}        // callback after successful update
                    fetchData={fetchData} 
                    />
                </TableCell>
                <TableCell>
                  <DeleteButton 
                    entityName="enrollment"
                    id={e.id}
                    fetchData={() => fetchData()}
                    endpoint={`${process.env.REACT_APP_API_URL}/api/enrollments`}
                    fetch={fetchEnrollments}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddEnrollmentModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSave={fetchData}
        students={users}
        // users={users}
        courses={courses}
      />
    </Container>
  );
}