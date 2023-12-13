// Signup.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./css/signup.css";

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
    <div class="main">
      <h2 class="signup">Sign Up</h2>
      <form class="form1" onSubmit={handleSignup}>
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
          Password<br></br>
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
      {/* <p>{signupMessage}</p> */}
      <button type="submit" class="submit" onClick={handleSignup}>Sign Up</button>
      <p>
        Already have an account? <Link to="/login"><p style={{color: "#77A6B6"}}>Login here</p></Link>
      </p>
    </div>
  );
};

export default Signup;
