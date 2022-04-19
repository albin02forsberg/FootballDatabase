import { Nav } from "./modules/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import React from "react";
import { auth } from "./firebase-config";
import Loading from "./modules/Loading";
import Footer from "./modules/Footer";

const Home = lazy(() => {
  return Promise.all([
    import("./pages/Home"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});
const About = lazy(() => {
  return Promise.all([
    import("./pages/About"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const Login = lazy(() => {
  return Promise.all([
    import("./pages/Login"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const Drills = lazy(() => {
  return Promise.all([
    import("./pages/Drills"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const Sessions = lazy(() => {
  return Promise.all([
    import("./pages/Sessions"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const CreateDrill = lazy(() => {
  return Promise.all([
    import("./pages/CreateDrill"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const CreateSession = lazy(() => {
  return Promise.all([
    import("./pages/CreateSession"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const CreateNews = lazy(() => {
  return Promise.all([
    import("./pages/CreateNews"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const News = lazy(() => {
  return Promise.all([
    import("./pages/News"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const Drill = lazy(() => {
  return Promise.all([
    import("./pages/drill"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const Session = lazy(() => {
  return Promise.all([
    import("./pages/Session"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const Privacy = lazy(() => {
  return Promise.all([
    import("./pages/Privacy"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});


const User = lazy(() => {
  return Promise.all([
    import("./pages/User"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

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
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<Loading />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loading />}>
              <Login setIsAuth={setIsAuth} />
            </Suspense>
          }
        />

        <Route
          path="/drills"
          element={
            <Suspense fallback={<Loading />}>
              <Drills />
            </Suspense>
          }
        />
        <Route
          path="/sessions"
          element={
            <Suspense fallback={<Loading />}>
              <Sessions />
            </Suspense>
          }
        />
        <Route
          path="/createDrill"
          element={
            <Suspense fallback={<Loading />}>
              <CreateDrill />
            </Suspense>
          }
        />
        <Route
          path="/createSession"
          element={
            <Suspense fallback={<Loading />}>
              <CreateSession />
            </Suspense>
          }
        />
        <Route
          path="/createNews"
          element={
            <Suspense fallback={<Loading />}>
              <CreateNews />
            </Suspense>
          }
        />
        <Route
          path="privacy"
          element={
            <Suspense fallback={<Loading />}>
              <Privacy />
            </Suspense>
          }
        />
        <Route
          path="/drill/:id"
          element={
            <Suspense fallback={<Loading />}>
              <Drill />
            </Suspense>
          }
        />
        <Route
          path="/session/:id"
          element={
            <Suspense fallback={<Loading />}>
              <Session />
            </Suspense>
          }
        />
        <Route
          path="/user/:uid"
          element={
            <Suspense fallback={<Loading />}>
              <User />
            </Suspense>
          }
        />
        <Route
          path="/news/:id"
          element={
            <Suspense fallback={<Loading />}>
              <News />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Loading />}>
              <div className="container">
                <h1>404</h1>
                <p>Page not found</p>
              </div>
            </Suspense>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
