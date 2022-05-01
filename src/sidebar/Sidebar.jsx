import "./sidebar.css";

export default function Sidebar() {
    const sidebarImg = require('./../images/' + 'boy-and-girl.jpg');

  return (
    <div className="sidebar">
      {/* <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT US</span>
  </div>*/}
      <div className="sidebarItem">
             
        <img className="sidebarImg" src={sidebarImg} alt="boy and girl reading" />
        
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Nisi minima doloremque non nemo enim magni dolores earum
          consectetur, ab deleniti sed veniam doloribus! </p>  
        
            
      </div>
      <div className="sidebareItem">
             <span className="sidebarTitle">FOLLOW US</span>
             <div className="sidebarSocial">
              <i className="sidebarIcon fa-brands fa-facebook-square"></i>
              <i className="sidebarIcon fa-brands fa-instagram-square"></i>
            <i className="sidebarIcon fa-solid fa-envelope"></i>
            </div>
      </div>
       
    </div>
  )
}
