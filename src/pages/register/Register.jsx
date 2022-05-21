import React, { useState, useEffect } from 'react';
import Spinner from "../../components/helpercomponents/Spinner";
import "./register.css"

export default function Register() {
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user !== null) {
      setLoading(false);
      window.location.pathname = '/';
    }
  }, [user])

  const HandleSubmit = async e => {
    e.preventDefault();
    setLoading(true)

    let firstName = e.target.firstName.value;
    let lastName = e.target.lastName.value;
    let email = e.target.email.value;
    let password = e.target.password.value;

    fetch(`${process.env.REACT_APP_API_BASE}/user-profiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstName, lastName, email, password })
    }).then(response => {
      if (!response.ok) {

        throw new Error('An error has occured: ' + response.statusText)

      } else {
        return response.json();
      }
    }).then(data => {
      alert('Account has been created. Please login');
      setUser(data);
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
    window.location.pathname = '/';
  }
  if (isLoading) {
    return <Spinner />
  } else {
    return (
      <div className="register">

        <button className="registerLoginButton" onClick={() => window.location.pathname = '/login'}>Login</button>
        <form className="registerForm" onSubmit={HandleSubmit}>
          <span className="registerTitle">Register</span>
          <div className="main">
            <div className="form-group">
              <label>First Name</label>
              <span className="fa fa-user form-control-icon"></span>
              <input type="text" className="form-control"
                pattern="[A-Za-z0-9_]{1,15}" required
                placeholder="Enter your first name" id="firstName" name="firstName" autoFocus={true} />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <span className="fa fa-user form-control-icon"></span>
              <input type="text" className="form-control"
                pattern="[A-Za-z0-9_]{1,15}" required
                placeholder="Enter your last name" id="lastName" name="lastName" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <span className="fa fa-envelope form-control-icon"></span>
              <input type="text" className="form-control" required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                placeholder="Enter your email" id="email" name="email" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <span className="fa fa-key form-control-icon"></span>
              <input type="password" className="form-control"
                pattern=".{8,}" required
                placeholder="Enter your password" id="password" name="password" />
            </div>


            <div className="form-group">
              <label> Confirm Password</label>
              <span className="fa fa-key form-control-icon"></span>
              <input type="password" className="form-control" required
                placeholder="Confirm your password" id="password_two" name="password_two" />
            </div>

          </div>

          <button className="registerButton" type="submit">Register</button>


        </form>
      </div>

    )
  }
}
