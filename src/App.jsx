import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            Fotbollens databas
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link" to="/drills">
                  Övningar
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/sessions">
                  Träningspass
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/about">
                  Om
                </Link>
              </li>
            </ul>
            <form class="d-flex">
              {isAuth ? (
                <div>
                  <Link
                    class="btn btn-outline-success my-2 my-sm-0"
                    to={"/user/" + auth.currentUser.uid}
                  >
                    {auth.currentUser.displayName}
                  </Link>
                  <button
                    class="btn btn-outline-danger my-2 my-sm-0"
                    onClick={signOut}
                  >
                    Logga ut
                  </button>
                </div>
              ) : (
                <Link class="btn btn-outline-success my-2 my-sm-0" to="/login">
                  Logga in
                </Link>
              )}
            </form>
          </div>
        </div>
      </nav>
      {/* <nav>
        <div className="defaultNav">
          <Link to="/">Home</Link>
          <Link to="/drills">Övningar</Link>
          <Link to="/sessions">Träningspass</Link>
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
      </nav> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/drills" element={<Drills />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/createDrill" element={<CreateDrill />} />
        <Route path="/createSession" element={<CreateSession />} />
        <Route path="/drill/:id" element={<Drill />} />
        <Route path="/session/:id" element={<Session />} />
        <Route path="/user/:uid" element={<User />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
