// Signup.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Signup = () => {

  const [data, setData]=useState({
    username:"",
    password:""
  })

  const navigate = useNavigate()

  const handleChange=(e)=>{
    setData({ ...data, [e.target.name]: e.target.value});
  }

  const handleSignup=(e)=>{
    e.preventDefault();
    const sendData = {
      username:data.username,
      password:data.password
    }

    axios.post('http://localhost:8081/signup', sendData)
    .then((res)=>{
      if (res.data === 'Failed'){
      alert('Username is already taken.');
      }
      else{
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
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            onChange={handleChange} value={data.username}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={handleChange} value={data.password}
            required
          />
        </label>
        <br />
        <button type="submit" onClick={handleSignup}>Sign Up</button>
      </form>
      {/* <p>{signupMessage}</p> */}
      <p>
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
};

export default Signup;
