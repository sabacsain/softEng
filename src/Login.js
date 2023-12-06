import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  let history = useNavigate();

  const [data, setData]=useState({
    username:"",
    password:""
  })

  const handleChange=(e)=>{
    setData({ ...data, [e.target.name]: e.target.value});
  }

  const handleLogin=(e)=>{
    e.preventDefault();
    const sendData = {
      username:data.username,
      password:data.password
    }
    console.log(sendData);

    axios.post('http://localhost/foodwaste/login-signup/login.php', sendData)
    .then((result)=>{
      if (result.data.Status =='Invalid'){
        alert('Invalid User');
      }
      else{
        history('/dashboard');
      }
    })
    .catch((error) => {
      console.error('Error during signup:', error);
      // Add additional error handling as needed
    });
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>.
      </p>
    </div>
  );
};

export default Login;
