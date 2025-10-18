// import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from "./components/Dashboard";
import AddCourse from "./components/AddCourse";
import AllCourses from "./components/AllCourses";

function App() {
  const [user, setUser] = useState(null);

  console.log(`User: ${user}`)

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login onLoginSuccess={(u) => setUser(u)} />
        ) : (
          <Routes>
            {/* Default route (home/dashboard) */}
            <Route path="/" element={<Dashboard user={user} onLogout={() => setUser(null)} />} />

            {/* AddCourse separate page */}
            <Route path="/add-course" element={<AddCourse />} />

            {/* View all courses */}
            <Route path="/courses" element={<AllCourses />} />

            {/* Redirect any unknown route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </Router>
    </div>  
  );
}

export default App;
