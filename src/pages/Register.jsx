import { Button, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { auth, db } from "../firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [name, setName] = React.useState("");
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const userCollectionRef = doc(db, "users", userCredentials.user.uid);
        setDoc(userCollectionRef, {
          name: name,
          uid: userCredentials.user.uid,
          email: userCredentials.user.email,
          photo: userCredentials.user.photoURL,
          joined: userCredentials.user.metadata.creationTime,
          lastSignInTime: userCredentials.user.metadata.lastSignInTime,
          provider: userCredentials.user.providerData,
          role: "user",
        });
      })
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            console.log("Profile updated");
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            navigate("/");
          });
      });
  };

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
        <Typography variant="h4">Registrera</Typography>
        <Box mt={2} />
        <TextField
          label="E-post"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Box mt={2} />
        <TextField
          label="Namn"
          onChange={(e) => {
            setName(e.target.value);
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
        <TextField
          label="Bekräfta lösenord"
          type="password"
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
          }}
        />
        <Box mt={2} />
        <Button variant="container" onClick={handleSubmit}>
          Registrera
        </Button>
      </Box>
    </Container>
  );
}
