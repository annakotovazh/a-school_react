import { React } from "react";
import "./singleUser.css"
import UseToken from '../../useToken';


export default function SingleUser({ item }) {
  let { firstName, lastName, dateCreated, email, userProfileId, imagePath, isActive, role } = item;
  const { user } = UseToken();

  const handleEdit = async (e, id, isActive) => {
    if (window.confirm(isActive ? 'Enable user?' : 'Disable user?')) {
      if (id) {
        fetch(`${process.env.REACT_APP_API_BASE}/user-profiles/${id}`, {
          method: 'PATCH',
          headers: {
            'Authorization': 'Bearer ' + user.token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ isActive })
        }).then(response => {
          if (!response.ok) {
            throw new Error('An error has occured: ' + response.statusText)
          } else {
            window.location.pathname = '/users';
            //navigate('/schoolclass');
          }
        }).catch(error => {
          alert(error);
        })
      }
    }
  }



  return (
    <div className="schoolClassItem">
      <div className="schoolClassPostInfo">
        <div className="text-uppercase schoolClassPostTitle">{email} ({role.roleName})</div>
        <div className="schoolClassPostText">
          <p>{firstName} {lastName}</p>
        </div>
      </div>
      <div className="schoolClassPostDate">
        <span className="skcPostDate">Date: {(new Date(dateCreated).toLocaleDateString("en-AU"))}</span> {(isActive) ? <button className="btn btn-user-disable" onClick={(e) => handleEdit(e, userProfileId, false)}>Disable</button> : <button className="btn btn-user-enable" onClick={(e) => handleEdit(e, userProfileId, true)}>Enable</button>}
      </div>

    </div>
  )

}

