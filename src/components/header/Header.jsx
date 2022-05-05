import "./header.css";

export default function Header() {
    const headerImg = require('./../../images/' + 'hands.jpg');
  return (
    <div className="header">
       
          <div className="headerTitles">
          <img className="headerImg" src={headerImg} alt="hands on grass" />
            <span className="headerTitlesLg">A-School</span>
          </div>
      
     
      </div>
  )
}
