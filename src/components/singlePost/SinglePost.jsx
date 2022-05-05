import "./singlePost.css"

export default function SinglePost({ item }) {
    const {title, description, dateCreated} = item;
    const schoolClassImg = require('./../../images/' + 'kids_handsup.jpg');
  return (
    <div className="schoolClassItem">
    <img className="schoolClassImg" src={schoolClassImg} alt="kids with teacher" />
    <div className="schoolClassPostInfo">
              <div className="schoolClassPostTitle">{title}</div>
      <div className="schoolClassPostText">
      
                  <p>{description}</p>
      </div>
    </div>
    <div className="schoolClassPostDate">
              <span className="skcPostDate">Date: {dateCreated}</span>
    </div>
  </div>
  )
}
