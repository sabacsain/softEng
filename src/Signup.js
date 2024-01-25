// Signup.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./css/signup.css";

const Signup = () => {
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear the specific error when the user starts typing
  }

  const handleSignup = (e) => {
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

    axios.post('http://localhost:8081/signup', sendData)
      .then((res) => {
        if (res.data === 'Failed') {
          alert('Username is already taken.');
        } else {
          alert('Registered Successfully.');
          navigate('/login');
        }
      })
      .catch((error) => {
        console.error('Error during signup:', error);
        // Add additional error handling as needed
      });
  }

  return (
    <div className="main">
      <h2 className="signup">Sign Up</h2>
      <form className="form1" onSubmit={handleSignup}>
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
          Password<br></br>
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
      <button type="submit" className="submit" onClick={handleSignup}>Sign Up</button>
      <p>
        Already have an account? <Link to="/login"><p style={{ color: "#77A6B6" }}>Login here</p></Link>
      </p>
    </div>
  );
};

export default Signup;
