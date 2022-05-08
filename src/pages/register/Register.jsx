import "./register.css"

export default function Register() {
  return (
      <div className="register">
       
      <button className="registerLoginButton" onClick={() => window.location.pathname = '/login'}>Login</button> 
          <form className="registerForm">
          <span className="registerTitle">Register</span>
<div className="main">
          <div className="form-group">
          <label>Username</label>
    <span className="fa fa-user form-control-icon"></span>
            <input type="text" className="form-control"
              pattern= "[A-Za-z0-9_]{1,15}" placeholder="Enter your username" />
          </div>  


          <div className="form-group">
          <label>Email</label>
    <span className="fa fa-envelope form-control-icon"></span>
            <input type="text" className="form-control"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              placeholder="Enter your email" />
  </div> 
          
          <div className="form-group">
          <label>Password</label>
    <span className="fa fa-key form-control-icon"></span>
            <input type="text" className="form-control"
              pattern=".{8,}"
              placeholder="Enter your password" />
          </div> 
          

          <div className="form-group">
          <label> Confirm Password</label>
    <span className="fa fa-key form-control-icon"></span>
            <input type="text" className="form-control"
              placeholder="Confirm your password" />
          </div> 

</div>    
        
<button className="registerButton">Register</button> 


  </form>
    </div>
    
  )
}
