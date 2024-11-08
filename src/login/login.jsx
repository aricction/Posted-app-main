// Import React and necessary hooks
import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from "../firebase"; // Import from firebase.js
import "../login/Login.css"; // Import your CSS file

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setTimeout(()=> {
            navigate('/');
      },1000);
      // Handle successful login here (e.g., redirect or display user info)
    } catch (error) {
      console.error("Error signing in with Google: ", error.message);
      setError("Failed to sign in with Google. Please try again.");
    }
  };

  const handleEmailPasswordSignIn = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        setSuccess('Registration successful!');
        setEmail('');
        setPassword('');
        setTimeout(()=> {
          navigate('/');
    },1000);
      });
      // Handle successful login here (e.g., redirect or display user info)
    } catch (error) {
      console.error("Error signing in with email and password: ", error.message);
      setError("Failed to sign in with email and password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <button className="google-signin" onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
      <form className="login-form" onSubmit={handleEmailPasswordSignIn}>
        <div className="form-group">
          <label htmlFor="login">Email</label>
          <input
            type="email"
            id="login"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Sign in with Email</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
}

export default Login;
