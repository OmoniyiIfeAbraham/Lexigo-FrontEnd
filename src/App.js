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
import Alphabets from "./components/Screens/Phonological Modules/Alphabets Module/Alphabets";
import Blending from "./components/Screens/Phonological Modules/Blending Module/Blending";
import VowelA from "./components/Screens/Phonological Modules/Alphabets Module/Vowels/VowelA";
import VowelE from "./components/Screens/Phonological Modules/Alphabets Module/Vowels/VowelE";
import VowelI from "./components/Screens/Phonological Modules/Alphabets Module/Vowels/VowelI";
import VowelO from "./components/Screens/Phonological Modules/Alphabets Module/Vowels/VowelO";
import VowelU from "./components/Screens/Phonological Modules/Alphabets Module/Vowels/VowelU";
import VowelQuiz from "./components/Screens/Phonological Modules/Alphabets Module/Vowels/VowelQuiz";
import One from "./components/Screens/Phonological Modules/Blending Module/ThreeLetterWords/One";
import BlendingQuiz from "./components/Screens/Phonological Modules/Blending Module/ThreeLetterWords/BlendingQuiz";
import MirrorLetters from "./components/Screens/Surface Modules/MirrorLettersModule/MirrorLetters";
import MirrorLearning from "./components/Screens/Surface Modules/MirrorLettersModule/MirrorLearning";
import MirrorQuiz from "./components/Screens/Surface Modules/MirrorLettersModule/MirrorQuiz";

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
          {/* alphabet module */}
          <Route path="/phonological-path/alphabet" element={<Alphabets />} />
          {/* blending module */}
          <Route path="/phonological-path/blending" element={<Blending />} />
          <Route path="/phonological-path/blending/one" element={<One />} />
          <Route
            path="/phonological-path/blending/quiz"
            element={<BlendingQuiz />}
          />
          {/* vowels */}
          <Route path="/phonological-path/bd/vowelA" element={<VowelA />} />
          <Route path="/phonological-path/bd/vowelE" element={<VowelE />} />
          <Route path="/phonological-path/bd/vowelI" element={<VowelI />} />
          <Route path="/phonological-path/bd/vowelO" element={<VowelO />} />
          <Route path="/phonological-path/bd/vowelU" element={<VowelU />} />
          <Route
            path="/phonological-path/al/vowel/quiz"
            element={<VowelQuiz />}
          />
          {/* mirror letters */}
          <Route path="/surface-path/mirror" element={<MirrorLetters />} />
          <Route
            path="/surface-path/mr/learning"
            element={<MirrorLearning />}
          />
          <Route
            path="/surface-path/mr/quiz"
            element={<MirrorQuiz />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
