import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import User from "./pages/User";
import Drills from "./pages/Drills";
import CreateDrill from "./pages/CreateDrill";
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
      <nav>
        <div className="defaultNav">
          <Link to="/">Home</Link>
          <Link to="/drills">Övningar</Link>
          <Link to="/about">Om</Link>
        </div>
        {!isAuth ? (
          <div className="left">
            <Link to="/login">Logga in</Link>
          </div>
        ) : (
          <div className="left">
            <Link to={"/user/" + auth.currentUser.uid}>
              {auth.currentUser.displayName}
            </Link>
            <Link to="/" onClick={signOut}>
              Logga ut
            </Link>
          </div>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/drills" element={<Drills />} />
        <Route path="/createDrill" element={<CreateDrill />} />
        <Route path="/user/:uid" element={<User />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
