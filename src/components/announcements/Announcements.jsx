import { React, useState, useEffect } from "react";
import "./announcements.css";
import Spinner from "../../components/helpercomponents/Spinner";
import SingleAnnouncement from "../singleAnnouncement/SingleAnnouncement";
import UseToken from '../../useToken';


export default function Announcements() {

  const [isLoading, setLoading] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const { user } = UseToken();


  useEffect(() => {
    if (announcements !== []) {
      setLoading(false);
    }
  }, [announcements])

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_BASE}/announcements?filter={"where":{"isActive":true},"order":"announcementId desc"}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + user.token,
        'Accept': 'application/json'
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error('The following error has occured: ' + response.statusText)
      } else {
        return response.json()
      }
    }).then(data => {
      setAnnouncements(data);
    }).catch(error => {
      alert(error)
      setLoading(false)
    })
  }, [user.token])

  if (isLoading) {
    return <Spinner />
  } else {
    return (
      <div className="announcements">

        {announcements.map((announcement, i) => (
          <SingleAnnouncement key={i} item={announcement} />
        ))}


      </div>
    )
  }
}

