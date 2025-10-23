// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Dashboard from "./components/Dashboard";
import AddCourse from "./components/AddCourse";
import AllCourses from "./components/AllCourses";
import AllUsers from "./components/AllUsers";

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (user) => {
  console.log("handleLoginSuccess called", user, localStorage)
  localStorage.setItem("user", JSON.stringify(user)); // save
  setUser(user); // if you have useState
  };

  useEffect(() => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) setUser(JSON.parse(savedUser)); // load
}, []);

  const handleLogout = () => {
    console.log("handleLogout called")
    localStorage.removeItem("user"); // clear
    setUser(null);
  };

  console.log(`User: ${user}`)

  return (
    <div className="App">
      {user ? ( <NavBar user={user} onLogout={handleLogout} / > ) : ( <></>)}
      <Router>
        {!user ? (
          <Login onLoginSuccess={(u) => {
            console.log("onLoginSuccess",u);
            handleLoginSuccess(u)}} />
        ) : (
          <Routes>
            {/* Default route (home/dashboard) */}
            <Route path="/" element={<Dashboard user={user} onLogout={handleLogout}/>} />

            {/* AddCourse separate page */}
            <Route path="/add-course" element={<AddCourse />} />

            {/* View all courses */}
            <Route path="/courses" element={<AllCourses />} />

            {/* View all users */}
            <Route path="/users" element={<AllUsers />} />
            <Route path="/dashboard" element={<Dashboard user={user} onLogout={handleLogout} />} />

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
