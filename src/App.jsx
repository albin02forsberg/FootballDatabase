import { Nav } from "./modules/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import User from "./pages/User";
import Drills from "./pages/Drills";
import CreateDrill from "./pages/CreateDrill";
import Drill from "./pages/drill";
import Session from "./pages/Session";
import Sessions from "./pages/Sessions";
import CreateSession from "./pages/CreateSession";
import CreateNews from "./pages/CreateNews";
import News from "./pages/News";
import { auth } from "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        setIsAuth(false);
        localStorage.clear();
        window.location.href("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
        localStorage.setItem("IsAuth", true);
      } else {
        setIsAuth(false);
        localStorage.clear();
      }
    });
  }, [isAuth]);

  return (
    <Router>
      <Nav isAuth={isAuth} signOut={signOut} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/drills" element={<Drills />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/createDrill" element={<CreateDrill />} />
        <Route path="/createSession" element={<CreateSession />} />
        <Route path="/createNews" element={<CreateNews />} />
        <Route path="/drill/:id" element={<Drill />} />
        <Route path="/session/:id" element={<Session />} />
        <Route path="/user/:uid" element={<User />} />
        <Route path="/news/:id" element={<News />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
