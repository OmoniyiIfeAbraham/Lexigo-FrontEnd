import logo from "./logo.svg";
import "./App.css";
import { ReactNotifications } from "react-notifications-component";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./components/Screens/Landing/Homepage";
import SignIn from "./components/Screens/Auth/SignIn";
import SignUp from "./components/Screens/Auth/SignUp";
import ComingSoon from "./components/Screens/ComingSoon";
import Home from "./components/Screens/Home/HomePage";
import Quiz from "./components/Screens/Assesment/Quiz";
import Profile from "./components/Screens/Profile/Profile";
import Path from "./components/Screens/Phonological Modules/Path";
import SurfacePath from "./components/Screens/Surface Modules/SurfacePath";

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
          {/* sign up page */}
          <Route path="/auth/signup" element={<SignUp />} />
          {/* coming soon */}
          <Route path="/coming-soon" element={<ComingSoon />} />
          {/* // HomePage */}
          <Route path="/home" element={<Home />} />
          {/* assessment */}
          <Route path="/quiz" element={<Quiz />} />
          {/* profile */}
          <Route path="/profile" element={<Profile />} />
          {/* phonological modules */}
          <Route path="/phonological-path" element={<Path />} />
          {/* surface modules */}
          <Route path="/surface-path" element={<SurfacePath />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
