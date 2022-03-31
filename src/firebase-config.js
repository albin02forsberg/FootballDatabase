// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAlrnk49_0Oc_E53r1TdyopIyuSfqws0ZI",
    authDomain: "footballdatabase-437cb.firebaseapp.com",
    projectId: "footballdatabase-437cb",
    storageBucket: "footballdatabase-437cb.appspot.com",
    messagingSenderId: "1037002500127",
    appId: "1:1037002500127:web:29e5e2dc8b3ae35f2c8d2a",
    measurementId: "G-Q3750YWHYD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);