import "./singleAnnouncement.css"
import UseToken from '../../useToken';
import AddAnnouncement from "../../pages/addAnnouncement/AddAnnouncement";

export default function SingleAnnouncement({ item }) {
  const { user } = UseToken();
  const { title, description, dateCreated, announcementId } = item;
  const postImg = require('./../../images/announcement.jpg');

  const handleDelete = async (e, id) => {
    if (window.confirm('Delete announcement?')) {
      if (id) {
        fetch(`${process.env.REACT_APP_API_BASE}/announcements/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + user.token,
            'Content-Type': 'application/json'
          }
        }).then(response => {
          if (!response.ok) {
            throw new Error('An error has occured: ' + response.statusText)
          } else {
            window.location.pathname = '/announcements';
          }
        }).catch(error => {
          alert(error);
        })
      }
    }
  }


    return (
      <div className="post">
        <div className="postItem">
          <span className="postTitle">ANNOUNCEMENTS</span>
        </div>
        <div className="postItem">
          <img className="postImg" src={postImg} alt="woman with megafone" />
          <div className="postInfo">
            <div className="text-uppercase postTitle">{title}</div>
            <div className="postText">

              <p>{description}</p>
            </div>
          </div>

        </div>
        <div className="postItem">
          <span className="sidebarTitle">Date: {(new Date(dateCreated).toLocaleDateString("en-AU"))}</span>
          <div>{(user?.role === 'admin') ? <i className="singlePostIcon fa-regular fa-trash-can" onClick={(e) => handleDelete(e, announcementId)}></i> : ''}
            {(user?.role === 'admin') ? <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={() => window.location.pathname = `/addannouncement/${announcementId}`}></i> : ''}
            </div>
        </div>
      </div>
    )

}

