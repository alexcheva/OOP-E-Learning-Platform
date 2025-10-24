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

export default function EnrollmentTable({ course, courses, students, fetchEnrollments }) {
  const [openModal, setOpenModal] = useState(false);

  // console.log("students",students);
  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Manage Enrollments for "{course.name}"
      </Typography>

      <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
        Add Enrollment
      </Button>

      <Table sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>Student</TableCell>
            <TableCell>Grade</TableCell>
            <TableCell>Drop</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {students?.map((e) => (
            <TableRow key={e._student_id}>
              <TableCell>{e.student_name}</TableCell>
              <TableCell>{e.grade}</TableCell>
              <TableCell>
                <DeleteButton 
                  entityName="enrollment"
                  id={e.student_id}
                  // onSave={fetchData}
                  endpoint="http://localhost:9000/api/enrollments"
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
        // onSave={fetchData}
        students={students}
        courses={courses}
      />
    </Box>
  );
}