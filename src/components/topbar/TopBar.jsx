import "./topbar.css";
import { Link } from 'react-router-dom';
import UseToken from '../../useToken';

export default function topbar({ SwitchTheme }) {
  const logo = require('./../../images/icon-192x192.png');
  const topImg = require('./../../images/user-icon-grey.jpeg');
  const { user } = UseToken();
  return (
    <div className='container' >
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <img className="logoImg" src={logo} alt="A-SCHOOL" />
          <Link to='/' className="navbar-brand">A-SCHOOL</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to='/' className="nav-link">Home</Link>
                {(user?.role === 'admin' || user?.role === 'teacher') ? <Link to='/addpost' className="nav-link">Add Post</Link> : ''}
                {(user?.token) ? <Link to='/login' className="nav-link">Logout</Link> : <Link to='/login' className="nav-link">Login</Link>}
                <Link to='/settings' className="nav-link">Profile Settings</Link>
                <Link to='/schoolclass' className="nav-link">Class</Link>
              </li>

              {/*<li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Class
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">Prep</a></li>
            <li><a className="dropdown-item" href="#">Year 1</a></li>
            <li><a className="dropdown-item" href="#">Year 2</a></li>
            <li><a className="dropdown-item" href="#">Year 3</a></li>
          </ul>
  </li>*/}

              <li>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={SwitchTheme}></input>
                  <label className="form-check-label" htmlFor="flexSwitchCheckDefault" >Light / Dark mode</label>
                </div>
              </li>
            </ul>
            {/*
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
</form> */}
          </div>
        </div>
      </nav>
      <div className="topRight">
        <img className="topImg" src={topImg} alt="user icon" />

      </div>
    </div>
  )
}


