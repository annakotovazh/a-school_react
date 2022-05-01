import "./topbar.css"

export default function topbar() {
  const topImg = require('./../images/' + 'teacher.jpg');
  return (
    <div className='top'>
          <div className="topLeft">
              <i className="topIcon fa-brands fa-facebook-square"></i>
              <i className="topIcon fa-brands fa-instagram-square"></i>
              <i className="topIcon fa-solid fa-envelope"></i>
          </div>
          <div className="topCentre">
              <ul className="topList">
                  <li className="toplistItem">HOME</li>
                  <li className="toplistItem">CLASS</li>
                  <li className="toplistItem">CONTACT</li>
                  <li className="toplistItem">TIMETABLE</li>
                  <li className="toplistItem">LOGOUT</li>
              </ul> 
          </div>
          <div className="topRight">
        <img className="topImg" src={topImg} alt="woman" />
          <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
          </div>
    </div>
  )
}


