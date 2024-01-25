import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from './AuthContext';  // Import the useAuth hook
import "./css/login.css";
import Cookies from 'js-cookie';  // Import Cookies

const Login = () => {
  let history = useNavigate();
  const { login } = useAuth();  // Access the login method from the useAuth hook

  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear the specific error when the user starts typing
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const sendData = {
      username: data.username,
      password: data.password
    }

    const newErrors = {};
    if (!data.username.trim()) {
      newErrors.username = (
        <>
          <br />
          Username is required.
          <br />
        </>
      );
    } else if (/\s/.test(data.username)) {
      newErrors.username = "Username cannot contain white spaces\n";
    }

    if (!data.password.trim()) {
      newErrors.password = (
        <>
          <br />
          Password is required.
          <br />
        </>
      );
       } else if (/\s/.test(data.password)) {
    newErrors.password = (
      <>
        <br />
        Password cannot contain white spaces<br />
        </>
        );
  }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    axios.post('http://localhost:8081/login', sendData)
      .then((res) => {
        if (res.data === "Failed") {
          alert("Invalid User.")
        } else {
          
          login();
          
          Cookies.set('authenticated', 'true');
          
          history('/dashboard');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        
      });
  }
  return (
    <div className="main">
      <h2 className="login">Login</h2>
      <form className="form1" onSubmit={handleLogin}>
        <label>
          Username
          <input
            className="username"
            type="text"
            name="username"
            onChange={handleChange}
            value={data.username}
            required
          />
          <span style={{ color: 'red' }}>{errors.username}</span>
        </label>
        <br />
        <label>
          Password<br />
          <input
            className="pass"
            type="password"
            name="password"
            onChange={handleChange}
            value={data.password}
            required
          />
          <span style={{ color: 'red' }}>{errors.password}</span>
        </label>
        <br />
      </form>
      <button type="submit" className="submit" onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <Link to="/signup"><p style={{color: "#77A6B6"}}>Sign up here</p></Link>
      </p>
    </div>
  );
};

export default Login;
