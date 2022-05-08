import "./singleAnnouncement.css"

export default function SingleAnnouncement({ item }) {
  const {title, description, dateCreated} = item;
  const postImg = require('./../../images/' + 'announcement.jpg');
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
          </div>
    </div>
  )
}

