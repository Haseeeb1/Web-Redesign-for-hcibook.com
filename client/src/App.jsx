import { useEffect, useState } from "react";
import "./App.css";
import SignIn from "./components/AuthComponents/SignIn";
import SignUp from "./components/AuthComponents/SignUp";
import Chapters from "./components/Chapters";
import Exercise from "./components/Exercise";
import Exercises from "./components/Exercises";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import Chapter from "./components/Chapter";
import { Toaster } from "react-hot-toast";
import OnlineResources from "./components/OnlineResources";
import FAQs from "./components/FAQs";
import NotFound from "./components/NotFound";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const toggleTheme = (theme) => {
    setTheme(theme);
  };

  useEffect(() => {
    // Add or remove the 'dark' class from the body element based on the state
    if (theme === "dark") {
      document.body.classList.add("bg-slate-800");
      // localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove("bg-slate-800");
      // localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  return (
    <main className={`${theme === "dark" ? "dark" : ""}`}>
      <Router>
        <Navbar toggleTheme={toggleTheme} />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Home />
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <div>
                <SignIn />
              </div>
            }
          />
          <Route
            path="/signup"
            element={
              <div>
                <SignUp />
              </div>
            }
          />
          <Route
            path="/chapters/"
            element={
              <div>
                <Chapters />
              </div>
            }
          />
          <Route
            path="/chapters/:chapNo"
            element={
              <div>
                <Chapter />
              </div>
            }
          />
          <Route
            path="/exercises"
            element={
              <div>
                <Exercises />
              </div>
            }
          />
          <Route
            path="/exercises/id"
            element={
              <div>
                <Exercise />
              </div>
            }
          />
          <Route
            path="/online-resources"
            element={
              <div>
                <OnlineResources />
              </div>
            }
          />
          <Route
            path="/faqs"
            element={
              <div>
                <FAQs />
              </div>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </main>
  );
}

export default App;
