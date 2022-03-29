import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";

export default function Login({ setIsAuth }) {
  if (auth.currentUser) {
    <Redirect to={"/user/" + auth.currentUser.uid} />;
  }

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setIsAuth(true);
        localStorage.setItem("IsAuth", true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="loginPage">
      <h1>Sign in with Google</h1>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}
