import React, { useEffect } from "react";
import { auth, provider } from "../firebase-config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import { Box, Container } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";

export default function Login({ setIsAuth }) {
  let navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setIsAuth(true);
        localStorage.setItem("isAuth", true);

        const userCollectionRef = doc(db, "users", result.user.uid);

        updateDoc(userCollectionRef, {
          name: result.user.displayName,
          uid: result.user.uid,
          email: result.user.email,
          photo: result.user.photoURL,
          joined: result.user.metadata.creationTime,
          lastSignInTime: result.user.metadata.lastSignInTime,
          provider: result.user.providerData,
        });

        // navigate("/");
      })
      .catch((error) => {
        console.log("ERROR");
        console.log(error);
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setIsAuth(true);
        localStorage.setItem("IsAuth", true);
        const userCollectionRef = doc(db, "users", result.user.uid);
        // Add user to database
        updateDoc(userCollectionRef, {
          name: result.user.displayName,
          uid: result.user.uid,
          email: result.user.email,
          photo: result.user.photoURL,
          joined: result.user.metadata.creationTime,
          lastSignInTime: result.user.metadata.lastSignInTime,
          provider: result.user.providerData,
          // if user is admin set role to admin
          // role:
          //   result.user.email === "albin02forsberg@gmail.com"
          //     ? "admin"
          //     : "user",
        });

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = "Logga in";
  });

  return (
    <Container>
      <Box
        style={{
          width: "75%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4">Logga in</Typography>
        <Box mt={2} />
        <TextField
          label="E-post"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Box mt={2} />
        <TextField
          label="Lösenord"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Box mt={2} />
        <Button variant="container" onClick={signIn}>
          Logga in
        </Button>
        <Button variant="contained" color="primary" onClick={signInWithGoogle}>
          Logga in med Google
        </Button>
      </Box>
      <Box
        style={{
          width: "75%",
          margin: "1rem auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="body1">
          Har du inte ett konto?{" "}
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/register")}
          >
            Skapa konto
          </Button>
        </Typography>
      </Box>
    </Container>
  );
}
