import "./header.css";

export default function Header() {
    const headerImg = require('./../images/' + 'hands.jpg');
  return (
      <div className="header">
          <div className="headerTitles">
            <span className="headerTitlesSm">Our School</span>
            <span className="headerTitlesLg">A-School</span>
          </div>
      
      <img className="headerImg" src={headerImg} alt="hands on grass" />
      </div>
  )
}
