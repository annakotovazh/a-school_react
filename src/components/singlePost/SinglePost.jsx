import "./singlePost.css"

export default function SinglePost() {
    const singlePostImg = require('./../../images/' + 'reading-book.jpg');
  return (
    <div className="singlePost">
          <div className="singlePostWrapper">
              <img className="singlePostImg" src={singlePostImg} alt="teacher reading book" />
              <h className="singlePostTitle">Lorem ipsum dolor, sit
                  <div className="singlePostAction">

                      <i className="singlePostIcon fa-regular fa-heart"></i>
                      <i className="singlePostIcon fa-regular fa-circle-down"></i>

                  </div>
              </h>
              <div className="singlePostInfo">
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Nisi minima doloremque non nemo enim magni dolores earum
          consectetur, ab deleniti sed veniam doloribus!  
                      consectetur, ab deleniti sed veniam doloribus!  
                      consectetur, ab deleniti sed veniam doloribus!  
                      consectetur, ab deleniti sed veniam doloribus!  
                      consectetur, ab deleniti sed veniam doloribus! </p>  
                  <span className="singlePostDate">21/04/2022</span>
              </div>
          </div>
    </div>
  )
}
