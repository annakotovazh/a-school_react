import "./register.css"

export default function Register() {
  return (
      <div className="register">
          {/*<form className="registerForm">
          <div class="mb-3">
    <label for="exampleInputUsername" class="form-label">Username</label>
    <input type="email" class="form-control" id="exampleInputUsername" aria-describedby="emailHelp"/>
    
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1"/>
              </div>
              <div class="mb-3">
    <label for="exampleInputConfPassword1" class="form-label">Confirm Password</label>
    <input type="password" class="form-control" id="exampleInputConfPassword1"/>
  </div>
              <button type="submit" class="btn btn-primary">Submit</button>
              <button className="registerLoginButton">Login</button>
</form>*/}
      <button className="registerLoginButton" onClick={() => window.location.pathname = '/login'}>Login</button> 
          <form className="registerForm">
          <span className="registerTitle">Register</span>
                  <label>Username</label>
              <input className="registerInput" type="text"
                  placeholder="Enter your username" />
               <label>Email</label>
              <input className="registerInput" type="email"
                  placeholder="Enter your email" />
                  <label>Password</label>
              <input className="registerInput" type="password"
                  placeholder="Enter your password" />
                 <label>Confirm Password</label>
              <input className="registerInput" type="password"
                  placeholder="Confirm your password" />
              <button className="registerButton">Register</button> 
              
  </form>
    </div>
  )
}
