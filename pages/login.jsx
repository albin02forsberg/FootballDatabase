import React, { useEffect } from "react";
import { auth, provider } from "../firebase-config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { db } from "../firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import { Box, Container } from "@mui/system";
import { Button, Paper, TextField, Typography } from "@mui/material";

export default function Login({ setIsAuth }) {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
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
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = "Logga in";
  });

  return (
    <section class="h-100 gradient-form">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-xl-10">
            <div class="card rounded-3 text-black">
              <div class="card-body p-md-5">
                <div class="row justify-content-center">
                  <button
                    className="btn btn-primary"
                    onClick={signInWithGoogle}
                  >
                    Logga in med Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
