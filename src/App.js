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
import ChangePassword from "./components/Screens/Auth/ChangePassword";
import SendResetLink from "./components/Screens/Auth/SendResetLink";
import ConsonantB from "./components/Screens/Phonological Modules/Alphabets Module/Consonants/ConsonantB";
import ConsonantC from "./components/Screens/Phonological Modules/Alphabets Module/Consonants/ConsonantC";
import ConsonantD from "./components/Screens/Phonological Modules/Alphabets Module/Consonants/ConsonantD";
// import ConsonantF from "./components/Screens/Phonological Modules/Alphabets Module/Consonants/ConsonantF";
// import ConsonantG from "./components/Screens/Phonological Modules/Alphabets Module/Consonants/ConsonantG";
// import ConsonantH from "./components/Screens/Phonological Modules/Alphabets Module/Consonants/ConsonantH";
// import ConsonantJ from "./components/Screens/Phonological Modules/Alphabets Module/Consonants/ConsonantJ";
// import ConsonantK from "./components/Screens/Phonological Modules/Alphabets Module/Consonants/ConsonantK";
// import ConsonantL from "./components/Screens/Phonological Modules/Alphabets Module/Consonants/ConsonantL";
// import ConsonantM from "./components/Screens/Phonological Modules/Alphabets Module/Consonants/ConsonantM";
// import ConsonantN from "./components/Screens/Phonological Modules/Alphabets Module/Consonants/ConsonantN";
// import ConsonantP from "./components/Screens/Phonological Modules/Alphabets Module/Consonants/ConsonantP";
// import ConsonantQ from "./components/Screens/Phonological Modules/Alphabets Module/Consonants/ConsonantQ";
// import ConsonantR from "./components/Screens/Phonological Modules/Alphabets Module/Consonants/ConsonantR";
// import ConsonantS from "./components/Screens/Phonological Modules/Alphabets Module/Consonants/ConsonantS";
// import ConsonantT from "./components/Screens/Phonological Modules/Alphabets Module/Consonants/ConsonantT";
// import ConsonantV from "./components/Screens/Phonological Modules/Alphabets Module/Consonants/ConsonantV";
// import ConsonantW from "./components/Screens/Phonological Modules/Alphabets Module/Consonants/ConsonantW";
// import ConsonantX from "./components/Screens/Phonological Modules/Alphabets Module/Consonants/ConsonantX";
// import ConsonantY from "./components/Screens/Phonological Modules/Alphabets Module/Consonants/ConsonantY";
// import ConsonantZ from "./components/Screens/Phonological Modules/Alphabets Module/Consonants/ConsonantZ";

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
          {/* update passowrd page */}
          <Route
            path="/auth/password/change/:id/:email"
            element={<ChangePassword />}
          />
          <Route path="/auth/password/send-reset" element={<SendResetLink />} />
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
          {/* consonants */}
          <Route
            path="/phonological-path/bd/consonantB"
            element={<ConsonantB />}
          />
          <Route
            path="/phonological-path/bd/consonantC"
            element={<ConsonantC />}
          />
          <Route
            path="/phonological-path/bd/consonantD"
            element={<ConsonantD />}
          />
          {/* <Route
            path="/phonological-path/bd/consonantF"
            element={<ConsonantF />}
          /> */}
          {/* <Route
            path="/phonological-path/bd/consonantG"
            element={<ConsonantG />}
          /> */}
          {/* <Route
            path="/phonological-path/bd/consonantH"
            element={<ConsonantH />}
          /> */}
          {/* <Route
            path="/phonological-path/bd/consonantJ"
            element={<ConsonantJ />}
          /> */}
          {/* <Route
            path="/phonological-path/bd/consonantK"
            element={<ConsonantK />}
          /> */}
          {/* <Route
            path="/phonological-path/bd/consonantL"
            element={<ConsonantL />}
          /> */}
          {/* <Route
            path="/phonological-path/bd/consonantM"
            element={<ConsonantM />}
          /> */}
          {/* <Route
            path="/phonological-path/bd/consonantN"
            element={<ConsonantN />}
          /> */}
          {/* <Route
            path="/phonological-path/bd/consonantP"
            element={<ConsonantP />}
          /> */}
          {/* <Route
            path="/phonological-path/bd/consonantQ"
            element={<ConsonantQ />}
          /> */}
          {/* <Route
            path="/phonological-path/bd/consonantR"
            element={<ConsonantR />}
          /> */}
          {/* <Route
            path="/phonological-path/bd/consonantS"
            element={<ConsonantS />}
          /> */}
          {/* <Route
            path="/phonological-path/bd/consonantT"
            element={<ConsonantT />}
          /> */}
          {/* <Route
            path="/phonological-path/bd/consonantV"
            element={<ConsonantV />}
          /> */}
          {/* <Route
            path="/phonological-path/bd/consonantW"
            element={<ConsonantW />}
          /> */}
          {/* <Route
            path="/phonological-path/bd/consonantX"
            element={<ConsonantX />}
          /> */}
          {/* <Route
            path="/phonological-path/bd/consonantY"
            element={<ConsonantY />}
          /> */}
          {/* <Route
            path="/phonological-path/bd/consonantZ"
            element={<ConsonantZ />}
          /> */}
          {/* mirror letters */}
          <Route path="/surface-path/mirror" element={<MirrorLetters />} />
          <Route
            path="/surface-path/mr/learning"
            element={<MirrorLearning />}
          />
          <Route path="/surface-path/mr/quiz" element={<MirrorQuiz />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
