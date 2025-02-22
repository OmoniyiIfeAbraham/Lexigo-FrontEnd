import logo from "./logo.svg";
import "./App.css";
import { ReactNotifications } from "react-notifications-component";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./components/Screens/Landing/Homepage";
import SignIn from "./components/Screens/Auth/SignIn";
import ComingSoon from "./components/Screens/ComingSoon";

function App() {
  return (
    <div>
      <ReactNotifications />
      <Router>
        <Routes>
          {/* landing page */}
          <Route path="/" element={<HomePage />} />
          {/* sign in page */}
          <Route path="/auth/signin" element={<SignIn />} />
          {/* coming soon */}
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
