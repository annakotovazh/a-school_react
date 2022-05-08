import Header from "../../components/header/Header";
import Announcements from "../../components/announcements/Announcements";


/*import Sidebar from "../../components/sidebar/Sidebar";*/
import "./home.css";

export default function Home() {
  //if(true) {
  //  return <Navigate to="/login" />
  //return <Login setToken={setToken} />
  //}
  
  return (
    <>
    <Header />
      <div className="home">
          <Announcements />
        { /*<Sidebar />*/}
      </div>
        </>
  );
}
