import "./post.css"

export default function Post() {
  const postImg = require('./../../images/' + 'announcement.jpg');
  return (
    <div className="post">
      <div className="postItem">
        <span className="postTitle">ANNOUNCEMENT</span>
  </div>
      <div className="postItem">
        <img className="postImg" src={postImg} alt="woman with megafone" />
        <div className="postInfo">
          <div className="postTitle">TITLE</div>
          <div className="postText">
            
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Nisi minima doloremque non nemo enim magni dolores earum
          consectetur, ab deleniti sed veniam doloribus!  
              consectetur, ab deleniti sed veniam doloribus! </p>  
              </div>
        </div>
        
      </div>
      <div className="postItem">
             <span className="sidebarTitle">Date: 11/03/2022</span>
          </div>
    </div>
  )
}

