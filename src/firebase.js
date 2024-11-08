// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4AHBCkB6ghIjUYxH9_xixLP9lhz3RTis",
  authDomain: "posted-a3b5a.firebaseapp.com",
  projectId: "posted-a3b5a",
  storageBucket: "posted-a3b5a.appspot.com",
  messagingSenderId: "146528210213",
  appId: "1:146528210213:web:2c2aac6148c05a0d94decc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signOut };
