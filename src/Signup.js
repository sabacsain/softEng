// Signup.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "./AuthService"; // Note: Now using the instance of AuthService

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signupMessage, setSignupMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Call the signup method from the instance of AuthService
      await AuthService.signup(username, password);
      setSignupMessage("Signup successful! You can now login.");
    } catch (error) {
      setSignupMessage(`Signup failed. ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
      <p>{signupMessage}</p>
      <p>
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
};

export default Signup;
