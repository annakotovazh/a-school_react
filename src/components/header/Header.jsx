import "./header.css";
import { Link } from 'react-router-dom';

export default function Header() {
  const headerImg = require('./../../images/hands.jpg');
  return (
    <div className="header">

      <div className="headerTitles">

        <img className="headerImg" src={headerImg} alt="hands on grass" />
        <Link to='/' className="headerTitlesLg">A-School</Link>

      </div>


    </div>
  )
}
