import React, { useEffect } from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { setDoc, doc, updateDoc } from "firebase/firestore";

export default function Login({ setIsAuth }) {
  let navigate = useNavigate();
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
    <div className="container">
      <div className="row">
        <h1>Sign in with Google</h1>
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
