// import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null);

  console.log(`User: ${user}`)

  return (
    <div className="App">
      {/* <header className="App-header"> */}
        {user ? (
          <>
          <Dashboard user={user} onLogout={() => setUser(null)} />
          </>
        ) : (
          <Login onLoginSuccess={(u) => setUser(u)} />
        )}
          {/* <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
      {/* </header> */}
    </div>
  );
}

export default App;
