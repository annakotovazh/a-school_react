import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import "./addAnnouncement.css";
import Spinner from "../../components/helpercomponents/Spinner";
import UseToken from '../../useToken';


export default function AddAnnouncement() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const { user } = UseToken();
  const [loadedPost, setLoadedPost] = useState(false);
  const params = useParams();
  const id = params.id;
 

  useEffect(() => {
    if (post !== null) {
      setLoading(false);
      navigate('/announcements');
    }
  }, [post, navigate]);

  useEffect(() => {
    if (loadedPost) {
      setLoading(false);
    }
  }, [loadedPost ])

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`${process.env.REACT_APP_API_BASE}/announcements/${id}`, {
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
        setLoadedPost(data);
      }).catch(error => {
        alert(error)
        setLoading(false)
      })
    }
  }, [id])


  const HandleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    // input validation required
    let title = e.target.txtTitle.value;
    let description = e.target.txtDescription.value;

    await new Promise(f => setTimeout(f, 500));

    let url = `${process.env.REACT_APP_API_BASE}/announcements`;
    let method = 'POST';

    if (id) {
      url = `${url}/${id}`;
      method = 'PATCH'
    }
   
    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token,
      },
      body: JSON.stringify({ title, description })
    }).then(response => {
      if (!response.ok) {
        throw new Error('An error has occured: ' + response.statusText)
      } else {
        if (response.status === 204) {
          return '{}';
        }
        else {
          return response.json();
        }
      }
    }).then(data => {
      setPost(data)
    }).catch(error => {
      setLoading(false)
      alert(error);
    });

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
              id="txtTitle"
              defaultValue={loadedPost?.title}/>
          </div>
          <div className="addPostGroup">
            <textarea placeholder="Add description..."
              type="text"
              className="addPostInput addText"
              name="txtDescription"
              id="txtDescription"
              defaultValue={loadedPost?.description}
            >

            </textarea>
          </div>
          <button className="addSubmit" type="submit" id="btnPublish">Publish</button>
          <button className="btnCancel" type="button" id="btnCancel" onClick={() => window.location.pathname = '/announcements'}>Cancel</button>
        </form>
      </div>
    )
  }
}
