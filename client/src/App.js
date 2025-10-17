// import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import Landing from './pages/Landing';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null);

  console.log(`User: ${user}`)

  return (
    <div className="App">
      {user ? (
        <Landing user={user} />
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
    </div>
  );
}

export default App;
