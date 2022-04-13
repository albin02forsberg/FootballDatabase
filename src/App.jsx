import { Nav } from "./modules/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import React from "react";
import { auth } from "./firebase-config";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Login = lazy(() => import("./pages/Login"));
const Drills = lazy(() => import("./pages/Drills"));
const Sessions = lazy(() => import("./pages/Sessions"));
const CreateDrill = lazy(() => import("./pages/CreateDrill"));
const CreateSession = lazy(() => import("./pages/CreateSession"));
const CreateNews = lazy(() => import("./pages/CreateNews"));
const News = lazy(() => import("./pages/News"));
const Drill = lazy(() => import("./pages/drill"));
const Session = lazy(() => import("./pages/Session"));
const User = lazy(() => import("./pages/User"));

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
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Login setIsAuth={setIsAuth} />
            </Suspense>
          }
        />

        <Route
          path="/drills"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Drills />
            </Suspense>
          }
        />
        <Route
          path="/sessions"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Sessions />
            </Suspense>
          }
        />
        <Route
          path="/createDrill"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <CreateDrill />
            </Suspense>
          }
        />
        <Route
          path="/createSession"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <CreateSession />
            </Suspense>
          }
        />
        <Route
          path="/createNews"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <CreateNews />
            </Suspense>
          }
        />
        <Route
          path="/drill/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Drill />
            </Suspense>
          }
        />
        <Route path="/session/:id" element={<Session />} />
        <Route
          path="/user/:uid"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <User />
            </Suspense>
          }
        />
        <Route
          path="/news/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <News />
            </Suspense>
          }
        />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
