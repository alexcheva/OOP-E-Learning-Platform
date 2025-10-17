import AuthTabs from "../components/AuthTabs";
import { Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

export default function Login({ onLoginSuccess }){
    
      return (
        <div className="login">
              <SchoolIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
              <Typography variant="h3" gutterBottom>
                Welcome to EduPortal
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                A smarter way to manage your courses and grades.
              </Typography>
          <AuthTabs onLoginSuccess={onLoginSuccess} />
        </div>
      );
}