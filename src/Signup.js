// Signup.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Signup = () => {
  let history = useNavigate();

  const [data, setData]=useState({
    username:"",
    password:""
  })

  const handleChange=(e)=>{
    setData({ ...data, [e.target.name]: e.target.value});
  }

  const handleSignup=(e)=>{
    e.preventDefault();
    const sendData = {
      username:data.username,
      password:data.password
    }
    console.log(sendData);

    axios.post('http://localhost/foodwaste/login-signup/insert.php', sendData)
    .then((result)=>{
      if (result.data.Status =='Invalid'){
        alert('Invalid User');
      }
      else{
        history('/login');
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
        <button type="submit">Sign Up</button>
      </form>
      {/* <p>{signupMessage}</p> */}
      <p>
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
};

export default Signup;
