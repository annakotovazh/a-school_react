import "./settings.css"

export default function Settings() {
    const settingsPPImg = require('./../../images/' + 'teacher.jpg');
  return (
    <div className="settings">
          <div className="settingsWrapper">
              <div className="settingsTitle">
                  <span className="settingsUpdateTitle">Update Your Account</span>
                  
              </div>
              <form className="settingsForm">
                  <div className="settingsPP">
                      <img className="settingsPPImg" src={settingsPPImg} alt="teacher" />
                      <label htmlFor="fileInput">
                      <i className="settingsPPIcon fa-regular fa-user"></i>
                      </label>
                      <input type="file" id="fileInput" style={{display:"none"}}></input>
                  </div>
                  <label>Username</label>
                  <input type="text" placeholder="Anna" />
                  <label>Email</label>
                  <input type="email" placeholder="anna@gmail.com" />
                  <label>Password</label>
                  <input type="password" />
                  <button className="settingsSubmit">Update</button>
                  <button className="settingsDeleteAccount">Delete Account</button>
                  
                 </form> 
          
          </div>
          </div>
  )
}
