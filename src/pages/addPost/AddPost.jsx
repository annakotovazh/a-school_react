import { React, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import "./addPost.css";
import Spinner from "../../components/helpercomponents/Spinner";
import UseToken from '../../useToken';


export default function AddPost() {
  const addPostImg = require('./../../images/girl-red-hair.jpg');
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const { user } = UseToken();

  useEffect(() => {
    if (post !== null) {
      setLoading(false);
      navigate('/schoolclass');
    }
  }, [post, navigate])

  const HandleSubmit = async e => {
    e.preventDefault();
    setLoading(true)



    // input validation required
    let title = e.target.txtTitle.value;
    let description = e.target.txtDescription.value;
    let imagePath = '';

    await new Promise(f => setTimeout(f, 500));

    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_BASE}/files`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + user.token,
      },
      body: new FormData(e.target),
    });
    const body = await res.json();

    console.log(body);

    if (body.files && body.files.length > 0) {
      imagePath = body.files[0].originalname;
    }
    fetch(`${process.env.REACT_APP_API_BASE}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token,
      },
      body: JSON.stringify({ title, description, imagePath })
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
        <img className="addPostImg" src={addPostImg} alt="girl reading book" />
        <form className="addPostForm" onSubmit={HandleSubmit}>
          <div className="addPostGroup">
            <label htmlFor="files">
              <i className="addPostIcon fa-solid fa-plus"></i>
            </label>
            <input type="file" id="files" name="files" style={{ display: "none" }} />
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
