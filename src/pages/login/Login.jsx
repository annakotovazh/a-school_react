
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "./login.css"
import Spinner from "../../components/helpercomponents/Spinner";
import { useNavigate, Link } from 'react-router-dom'

export default function Login({ setToken }) {

  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false)
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await new Promise(f => setTimeout(f, 1000));
    fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify({email, password})
    }).then(response => {
      if (!response.ok) {
        if (response.status == 401) {
          throw new Error('An error has occured: Invalid email or password.' )
        }
        else {
          throw new Error('An error has occured: ' + response.statusText)
        }
      } else {
        return response.json();
      }
    }).then(data => {
      console.log(data)
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
    localStorage.removeItem('token');
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
          <section class="input-container">
                <i class="fa fa-user icon"></i>
                <input className="input-field" id="fname" type="text" placeholder="First Name" name="lstnm" required
                    pattern="[A-Za-z]{2,}$" title="Lettrs only" maxlength="32"
                    oninput="checkInput('fname', 'fnameError')"/>
                <div class="error" id="fnameError">Please match the format requested.</div>
            </section>
          <input className="loginInput" type="email" required placeholder="Enter your email" onChange={e => setEmail(e.target.value)} />
          <i class="fa fa-user icon"></i>
          <label>Password</label>
          <input className="loginInput" type="password" required placeholder="Enter your password" onChange={e => setPassword(e.target.value)} />
          <button className="loginButton" type="submit">Login</button>
              
        </form>
          
      </div>
    )
  }
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};
