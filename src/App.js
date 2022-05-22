import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import AddPost from "./pages/addPost/AddPost";
import Settings from "./pages/settings/Settings";
import { useEffect, useState } from 'react';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import SchoolClass from "./pages/schoolClass/SchoolClass";
import Footer from "./components/footer/Footer";
import { Routes, Route } from 'react-router-dom'
import UseToken from './useToken';
import Announcements from "./components/announcements/Announcements";
import AddAnnouncement from "./pages/addAnnouncement/AddAnnouncement";
import Users from "./pages/users/Users";


function App() {


  const [isDarkMode, setDarkMode] = useState('false')

  useEffect(() => {
    let darkTheme = localStorage.getItem('DarkMode')
    if (darkTheme === 'true') {
      setDarkMode(darkTheme)
    } else {
      setDarkMode('false')
    }
  }, [])

  useEffect(() => {
    let theme = document.getElementsByTagName('link')[1];
    console.log(isDarkMode)
    if (isDarkMode === 'true') {
      theme.setAttribute('href', './css/bootstrap-night.min.css');
    } else {
      theme.setAttribute('href', './css/bootstrap.min.css');
    }
  }, [isDarkMode])

  function onThemeSwitch(e) {
    if (e.target.checked) {
      setDarkMode('true')
      localStorage.setItem('DarkMode', 'true')
    } else {
      localStorage.setItem('DarkMode', 'false')

      setDarkMode('false')
    }


  }

  const { user, setToken } = UseToken();

  console.log(window.location.pathname);

  if (window.location.pathname === '/register') {
    return <Register />
  }

  if (!user) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="App d-flex flex-column min-vh-100">

      <TopBar SwitchTheme={onThemeSwitch} />
      <div className="AppBody">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login setToken={setToken} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/addpost' element={<AddPost />} />
          <Route path='/schoolclass' element={<SchoolClass />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/announcements' element={<Announcements />} />
          <Route path='/addannouncement' element={<AddAnnouncement />} />
          <Route path='/users' element={<Users />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
