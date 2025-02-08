import logo from "./logo.svg";
import "./App.css";
import { ReactNotifications } from "react-notifications-component";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./components/Screens/Landing/Homepage";

function App() {
  return (
    <div>
      <ReactNotifications />
      <Router>
        <Routes>
          {/* index page */}
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
