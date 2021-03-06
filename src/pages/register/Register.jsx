import React, { useState, useEffect } from 'react';
import Spinner from "../../components/helpercomponents/Spinner";
import "./register.css"

export default function Register() {
  let accessRole = 3;

  const onValueChange = (e, val) => {
    accessRole = val;

    console.log(accessRole);
  }

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
      body: JSON.stringify({ firstName, lastName, email, password, roleId:accessRole })
    }).then(response => {
      if (!response.ok) {

        throw new Error('An error has occured: ' + response.statusText)

      } else {
        return response.json();
      }
    }).then(data => {
      alert('Account has been created. Please login after confirmation');
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

        




<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">About registration</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      After registration, your account will be inactive. The administrator must activate your account after verification. This may take one business day.
      </div>
    </div>
  </div>
</div>
        <form className="registerForm" onSubmit={HandleSubmit}>
          <span className="registerTitle">Register <button type="button" className="btn btn-help" data-bs-toggle="modal" data-bs-target="#exampleModal" aria-label="Help">
  ?
</button></span>
          <div className="main">
            <div className="form-group">
              <label>First Name</label>
              <span className="fa fa-user form-control-icon"></span>
              <input type="text" className="form-control"
                pattern="[A-Za-z]{1,15}" required
                placeholder="Enter your first name" id="firstName" name="firstName" autoFocus={true} />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <span className="fa fa-user form-control-icon"></span>
              <input type="text" className="form-control"
                pattern="[A-Za-z]{1,15}" required
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

              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" value="2" name="accessRole" id="accessRole1"
                  onClick={(e) => onValueChange(e, 2)}></input>
                <label className="form-check-label" htmlFor="accessRole1">
                  Teacher
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" value="2" name="accessRole" id="accessRole2"
                  onClick={(e) => onValueChange(e, 3)} checked={true}></input>
                <label className="form-check-label" htmlFor="accessRole2">
                  Parent
                </label>
              </div>
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
          <button className="registerLoginButton" onClick={() => window.location.pathname = '/login'}>Login</button>


        </form>
      </div>

    )
  }
}
