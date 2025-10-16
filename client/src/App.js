// import logo from './logo.svg';
import './App.css';
import AuthTabs from "./components/AuthTabs";
import { Container, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

function App() {
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
        {/* <RegisterForm /> */}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      <AuthTabs />
      </header>
    </div>
  );
}

export default App;
