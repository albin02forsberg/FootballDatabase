// import { Nav } from "./modules/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import React from "react";
import { auth, db } from "./firebase-config";
import Loading from "./modules/Loading";
import { collection, doc, getDoc } from "firebase/firestore";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

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

const Player = lazy(() => {
  return Promise.all([
    import("./pages/Team/Player"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const EditDrill = lazy(() => {
  return Promise.all([
    import("./pages/EditDrill"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const Admin = lazy(() => {
  return Promise.all([
    import("./pages/admin/Admin"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const Users = lazy(() => {
  return Promise.all([
    import("./pages/admin/Users"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const AdminDrills = lazy(() => {
  return Promise.all([
    import("./pages/admin/Drills"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const Header = lazy(() => {
  return Promise.all([
    import("./modules/Header"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

// const Footer = lazy(() => {
//   return Promise.all([
//     import("./modules/Footer"),
//     new Promise((resolve) => setTimeout(resolve, 500)),
//   ]).then(([moduleExports]) => moduleExports);
// });

const NotFound = lazy(() => {
  return Promise.all([
    import("./modules/NotFound"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const Club = lazy(() => {
  return Promise.all([
    import("./pages/Club"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const Team = lazy(() => {
  return Promise.all([
    import("./pages/Team/Team"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const Contact = lazy(() => {
  return Promise.all([
    import("./pages/Contact"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const MyTeams = lazy(() => {
  return Promise.all([
    import("./pages/Team/MyTeams"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const AddGame = lazy(() => {
  return Promise.all([
    import("./pages/Team/AddGame"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const AddPlayer = lazy(() => {
  return Promise.all([
    import("./pages/Team/AddPlayer"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

// const CreateTeam = lazy(() => {
//   return Promise.all([
//     import("./pages/Team/CreateTeam"),
//     new Promise((resolve) => setTimeout(resolve, 500)),
//   ]).then(([moduleExports]) => moduleExports);
// });

const CreateClub = lazy(() => {
  return Promise.all([
    import("./pages/admin/CreateClub"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const AdminClubs = lazy(() => {
  return Promise.all([
    import("./pages/admin/Clubs"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const Game = lazy(() => {
  return Promise.all([
    import("./pages/Team/Game"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const Register = lazy(() => {
  return Promise.all([
    import("./pages/Register"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        setIsAuth(false);
        localStorage.clear();
        window.location.replace("/");
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
        // Get user from db
        const userCollectionRef = collection(db, "users");
        const userRef = doc(userCollectionRef, user.uid);
        getDoc(userRef)
          .then((u) => {
            setUser(u.data());
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setIsAuth(false);
        localStorage.clear();
      }
    });
  }, [isAuth]);

  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#5A4AE3",
        light: "#5A4AE3",
        dark: "#5A4AE3",
        contrastText: "#fff",
      },
      secondary: {
        main: "#4AE3A6",
        light: "#4AE3A6",
        dark: "#4AE3A6",
        contrastText: "#fff",
      },
      error: {
        main: "#E34A4A",
        light: "#E34A4A",
        dark: "#E34A4A",
        contrastText: "#fff",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Header user={user} signOut={signOut} />
        </Suspense>
        {/* <Nav isAuth={isAuth} signOut={signOut} user={user} /> */}
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
            path="/contact"
            element={
              <Suspense fallback={<Loading />}>
                <Contact />
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
            path="/register"
            element={
              <Suspense fallback={<Loading />}>
                <Register setIsAuth={setIsAuth} />
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
            path="/myteams"
            element={
              <Suspense fallback={<Loading />}>
                <MyTeams />
              </Suspense>
            }
          />
          <Route
            path="/privacy"
            element={
              <Suspense fallback={<Loading />}>
                <Privacy />
              </Suspense>
            }
          />
          <Route
            path="/admin"
            element={
              <Suspense fallback={<Loading />}>
                <Admin />
              </Suspense>
            }
          />
          <Route
            path="/admin/users"
            element={
              <Suspense fallback={<Loading />}>
                <Users />
              </Suspense>
            }
          />
          <Route
            path="/admin/drills"
            element={
              <Suspense fallback={<Loading />}>
                <AdminDrills />
              </Suspense>
            }
          />
          <Route
            path="/admin/clubs"
            element={
              <Suspense fallback={<Loading />}>
                <AdminClubs />
              </Suspense>
            }
          />
          <Route
            path="/admin/createclub"
            element={
              <Suspense fallback={<Loading />}>
                <CreateClub />
              </Suspense>
            }
          />
          <Route
            path="/addplayer/:id"
            element={
              <Suspense fallback={<Loading />}>
                <AddPlayer />
              </Suspense>
            }
          />
          <Route
            path="/club/:id"
            element={
              <Suspense fallback={<Loading />}>
                <Club />
              </Suspense>
            }
          />
          <Route
            path="/addgame/:id"
            element={
              <Suspense fallback={<Loading />}>
                <AddGame />
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
                <User signOut={signOut} />
              </Suspense>
            }
          />
          <Route
            path="/player/:id"
            element={
              <Suspense fallback={<Loading />}>
                <Player />
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
            path="/team/:id"
            element={
              <Suspense fallback={<Loading />}>
                <Team />
              </Suspense>
            }
          />
          <Route
            path="/drill/:id/edit"
            element={
              <Suspense fallback={<Loading />}>
                <EditDrill />
              </Suspense>
            }
          />
          <Route
            path="/team/:id/game/:gameId"
            element={
              <Suspense fallback={<Loading />}>
                <Game />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Loading />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
        {/* <MobileNav isAuth={isAuth} signOut={signOut} user={user} /> */}
        {/* <Box mt={8}></Box> */}
      </Router>
    </ThemeProvider>
  );
}

export default App;
