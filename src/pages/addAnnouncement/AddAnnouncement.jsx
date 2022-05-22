import { React, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import "./addAnnouncement.css";
import Spinner from "../../components/helpercomponents/Spinner";
import UseToken from '../../useToken';


export default function AddAnnouncement() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const { user } = UseToken();

  useEffect(() => {
    if (post !== null) {
      setLoading(false);
      navigate('/announcements');
    }
  }, [post, navigate])

  const HandleSubmit = async e => {
    e.preventDefault();
    setLoading(true)



    // input validation required
    let title = e.target.txtTitle.value;
    let description = e.target.txtDescription.value;

    await new Promise(f => setTimeout(f, 500));

    fetch(`${process.env.REACT_APP_API_BASE}/announcements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token,
      },
      body: JSON.stringify({ title, description })
    }).then(response => {
      if (!response.ok) {
        throw new Error('An error has occured: ' + response.statusText)
      } else {
        return response.json();
      }
    }).then(data => {
      setPost(data)
    }).catch(error => {
      setLoading(false)
      alert(error);
    })
  }

  if (isLoading) {
    return <Spinner />
  } else {
    return (
      <div className="addPost">
        <form className="addPostForm" onSubmit={HandleSubmit}>
          <div className="addPostGroup">
            <input type="text"
              placeholder="Title"
              className="addPostInput"
              autoComplete="New Post"
              name="txtTitle"
              id="txtTitle" />
          </div>
          <div className="addPostGroup">
            <textarea placeholder="Add description..."
              type="text"
              className="addPostInput addText"
              name="txtDescription"
              id="txtDescription">

            </textarea>
          </div>
          <button className="addSubmit" type="submit" id="btnPublish">Publish</button>
        </form>
      </div>
    )
  }
}
