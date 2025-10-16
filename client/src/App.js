// import logo from './logo.svg';
import './App.css';
import AuthTabs from "./components/AuthTabs";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="Edu-logo" alt="logo" /> */}
        <h1>
         Welcome to EduPortal.
        </h1>
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
