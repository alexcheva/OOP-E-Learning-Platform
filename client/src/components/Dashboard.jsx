import { Box, Typography, } from "@mui/material";
import NavBar from '../components/NavBar';
import StudentDashboard from '../components/StudentDashboard';
import TeacherDashboard from '../components/TeacherDashboard';

export default function Dashboard({ user, onLogout }) {
      if (!user) {
    return <p>Please log in.</p>;
  }
  return (
    <Box>
      <NavBar user={user} onLogout={onLogout} / >
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {user.role === "teacher"
            ? "Teacher Dashboard"
            : "Student Dashboard"}
        </Typography>
        <div className="p-6">
            {user.role === 'teacher' ? (
            <TeacherDashboard user={user} />
            ) : (
            <StudentDashboard user={user} />
            )}
        </div>
      </Box>
    </Box>
  );
}
