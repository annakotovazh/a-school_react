import "./schoolClass.css"

export default function schoolClass() {
  const schoolClassImg = require('./../../images/' + 'kids_handsup.jpg');

  
  return (
    <div className="schoolClass">
         <div className="schoolClassItem">
        <img className="schoolClassImg" src={schoolClassImg} alt="kids with teacher" />
        <div className="schoolClassPostInfo">
          <div className="schoolClassPostTitle">TITLE</div>
          <div className="schoolClassPostText">
            
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Nisi minima doloremque non nemo enim magni dolores earum
          consectetur, ab deleniti sed veniam doloribus!  
              consectetur, ab deleniti sed veniam doloribus! </p>  
              </div>
        </div>
      <div className="schoolClassPostDate">
             <span className="skcPostDate">Date: 11/03/2022</span>
          </div>
      </div>
      <div className="schoolClassItem">
        <img className="schoolClassImg" src={schoolClassImg} alt="girl reading book" />
        <div className="schoolClassPostInfo">
          <div className="schoolClassPostTitle">TITLE</div>
          <div className="schoolClassPostText">
            
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Nisi minima doloremque non nemo enim magni dolores earum
          consectetur, ab deleniti sed veniam doloribus!  
              consectetur, ab deleniti sed veniam doloribus! </p>  
              </div>
        </div>
      <div className="schoolClassPostDate">
             <span className="skcPostDate">Date: 11/03/2022</span>
          </div>
        </div>
    </div>
  )
}
