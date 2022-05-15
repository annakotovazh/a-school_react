
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "./login.css";
import Spinner from "../../components/helpercomponents/Spinner";
import { useNavigate } from 'react-router-dom';

export default function Login({ setToken }) {

  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await new Promise(f => setTimeout(f, 500));
    fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify({email, password})
    }).then(response => {
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('An error has occured: Invalid email or password.' )
        }
        else {
          throw new Error('An error has occured: ' + response.statusText)
        }
      } else {
        return response.json();
      }
    }).then(data => {
      setToken(data);
      setLoading(false);
      navigate('/');
    }).catch(error => {
      setLoading(false)
      alert(error);
    })

    
  }

  const token = localStorage.getItem('token');
  
  if (token) {
    console.log('LOGOUT');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    //navigate('/');
    window.location.pathname = '/';
  }
  
  if (isLoading) {
    return <Spinner />
  } else {
    return (
      <div className="login">
        <button className="loginRegisterButton" onClick={() => window.location.pathname = '/register'}>Register</button>
        <form className="loginForm" onSubmit={handleSubmit}>
          <span className="loginTitle">Login</span>
          <label>Email</label>
          <div className="main">
          <div className="form-group">
          <label>Email</label>
    <span className="fa fa-envelope form-control-icon"></span>
              <input type="email" className="form-control"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                placeholder="Enter your email" required
                onChange={e => setEmail(e.target.value)}/>
  </div> 
          
          <div className="form-group">
          <label>Password</label>
    <span className="fa fa-key form-control-icon"></span>
              <input type="password" className="form-control" required
                pattern=".{8,}" placeholder="Enter your password"
                onChange={e => setPassword(e.target.value)} />
            </div> 
            </div>
         
          <button className="loginButton" type="submit">Login</button>
              
        </form>
          
      </div>
    )
  }
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};
