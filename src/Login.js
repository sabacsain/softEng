import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from './AuthContext';  // Import the useAuth hook
import "./css/login.css";

const Login = () => {
  let history = useNavigate();
  const { login } = useAuth();  // Access the login method from the useAuth hook

  const [data, setData] = useState({
    username: "",
    password: ""
  })

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const sendData = {
      username: data.username,
      password: data.password
    }
    axios.post('http://localhost:8081/login', sendData)
      .then((res) => {
        if(res.data === "Failed") {
          alert("Invalid User.")
        } else {
          // Call the login method to set authentication status
          login();
          // Redirect to dashboard after successful login
          history('/dashboard');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        // Add additional error handling as needed
      });
  }

  return (
    <div class="main">
      <h2 class="login">Login</h2>
      <form class="form1" onSubmit={handleLogin}>
        <label>
          Username
          <input
            class="username"
            type="text"
            name="username"
            onChange={handleChange} value={data.username}
            required
          />
        </label>
        <br />
        <label>
          Password<br />
          <input
            class="pass"
            type="password"
            name="password"
            onChange={handleChange} value={data.password}
            required
          />
        </label>
        <br />
        
      </form>
      <button type="submit" class="submit" onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <Link to="/signup"><p style={{color: "#77A6B6"}}>Sign up here</p></Link>
      </p>
    </div>
  );
};

export default Login;
