import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import User from "./pages/User";
import { auth } from "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [login, setLogin] = useState("/login");

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to={login}>Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/user/:uid" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
