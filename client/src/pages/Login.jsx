import AuthTabs from "../components/AuthTabs";
import { Container, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

export default function Login({ onLoginSuccess }){
    
      return (
        <div className="App">
          <header className="App-header">
            <Container maxWidth="md" sx={{ textAlign: "center", mt: 10 }}>
              <SchoolIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
              <Typography variant="h3" gutterBottom>
                Welcome to EduPortal
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                A smarter way to manage your courses and grades.
              </Typography>
    
            </Container>
          <AuthTabs onLoginSuccess={onLoginSuccess} />
          </header>
        </div>
      );
}