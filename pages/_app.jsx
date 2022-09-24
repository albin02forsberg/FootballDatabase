import Header from "../components/Header";
import "../styles/globals.css";
import { Hydrate, QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BottomNavigation, Container, Typography } from "@mui/material";
import { auth } from "../firebase-config";
const queryClient = new QueryClient();
import { useEffect, useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import Nav from "../components/Nav";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

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

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Header user={user} signOut={signOut} />
          <Container>
            <Component {...pageProps} />
          </Container>
          {/* <Nav /> */}
          <ReactQueryDevtools />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
