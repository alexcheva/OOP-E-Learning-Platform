import { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import AddEnrollmentModal from "./modals/AddEnrollmentModal";
import DeleteButton from "./buttons/DeleteButton";
import EditButton from "./buttons/EditButton_new";

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
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Manage Enrollments
      </Typography>

      <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
        Add Enrollment
      </Button>

      <Table sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>Student</TableCell>
            <TableCell>Course</TableCell>
            <TableCell>Grade</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Drop</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {enrollments?.map((e) => (
            <TableRow key={e.id}>
              <TableCell>{e.student_name}</TableCell>
              <TableCell>{e.course_name}</TableCell>
              <TableCell>{e.grade}</TableCell>
              <TableCell>Grade
                <EditButton item={e} onEdit={handleEditClick} />
                {/* <EditButton
                  isOpen={openModal}
                  onClose={() => setOpenModal(false)}
                  entityName={"enrollment"}   // e.g. "course", "user", "enrollment"
                  id={e.id}
                  data={e}         // current record to edit
                  fields={enrollmentFields}       // array of { name, label, type }
                  endpoint={endpoint}     // `/api/courses`, `/api/users`, `/api/enrollments`
                  onSave={fetchData}        // callback after successful update
                  fetchData={fetchData} 
                  /> */}
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

      <AddEnrollmentModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSave={fetchData}
        students={users}
        // users={users}
        courses={courses}
      />
    </Box>
  );
}