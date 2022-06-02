import { React, useState, useEffect } from "react";
import Spinner from "../../components/helpercomponents/Spinner";
import "./settings.css";
import UseToken from '../../useToken';



export default function Settings() {
  const settingsPPImg = require('./../../images/teacher.jpg');

  const [isLoading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState([]);
  const { user } = UseToken();

  if (!user?.id) {
    window.location.pathname = '/';;
  }

  useEffect(() => {
    if (userProfile !== []) {
      setLoading(false);
    }
  }, [userProfile])

  function fetchUser() {
    fetch(`${process.env.REACT_APP_API_BASE}/user-profiles/${user.id}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + user.token,
        'Accept': 'application/json'
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error('The following error has occured: ' + response.statusText)
      } else {
        return response.json()
      }
    }).then(data => {
      setUserProfile(data);
    }).catch(error => {
      alert(error)
      setLoading(false)
    })
  }

  useEffect(() => {
    setLoading(true);
    fetchUser();
  }, [user.token, user.id])


  const HandleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    // input validation required
    let firstName = e.target.firstName.value;
    let lastName = e.target.lastName.value;
    let email = e.target.email.value;
    let password = e.target.password.value;

    const url = `${process.env.REACT_APP_API_BASE}/user-profiles/${user.id}`;
    const method = 'PATCH';
    const body = { firstName, lastName, email };
    if (password) { 
      body.password = password;
    }

   
    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token,
      },
      body: JSON.stringify(body)
    }).then(response => {
      if (!response.ok) {
        throw new Error('An error has occured: ' + response.statusText)
      } else {
        if (response.status === 204) {
          return '{}';
        }
        else {
          return response.json();
        }
      }
    }).then(data => {
      fetchUser();
    }).catch(error => {
      setLoading(false)
      alert(error);
    });

  }

  if (isLoading) {
    return <Spinner />
  } else {
    return (
      <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update Your Account</span>

          </div>
          <form className="settingsForm" onSubmit={HandleSubmit}>
            <div className="settingsPP">
              <img className="settingsPPImg" src={settingsPPImg} alt="teacher" />
              <label htmlFor="fileInput">
                <i className="settingsPPIcon fa-regular fa-user"></i>
              </label>
              <input type="file" id="fileInput" style={{ display: "none" }}></input>
            </div>

            <div className="form-group">
              <label>First Name</label>
              <span className="fa fa-user form-control-icon"></span>
              <input type="text" className="form-control"
                pattern="[A-Za-z0-9_]{1,15}" required
                placeholder="Enter your first name" id="firstName" name="firstName" autoFocus={true} defaultValue={userProfile.firstName} />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <span className="fa fa-user form-control-icon"></span>
              <input type="text" className="form-control"
                pattern="[A-Za-z0-9_]{1,15}" required
                placeholder="Enter your last name" id="lastName" name="lastName" defaultValue={userProfile.lastName} />
            </div>

            <div className="form-group">
              <label>Email</label>
              <span className="fa fa-envelope form-control-icon"></span>
              <input type="text" className="form-control" required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                placeholder="Enter your email" id="email" name="email" defaultValue={userProfile.email} />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <span className="fa fa-key form-control-icon"></span>
              <input type="password" className="form-control"
                pattern=".{8,}" 
                placeholder="Enter your password" id="password" name="password" />
            </div>
            <button className="settingsSubmit" type="submit">Update</button>

          </form>

        </div>
      </div>
    )
  }
}
