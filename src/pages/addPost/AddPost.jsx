import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import "./addPost.css";
import Spinner from "../../components/helpercomponents/Spinner";
import UseToken from '../../useToken';


export default function AddPost() {
  const [img, setImg] = useState('');
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [loadedPost, setLoadedPost] = useState(false);
  const { user } = UseToken();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (post !== null) {
      setLoading(false);
      navigate('/schoolclass');
    }
  }, [post, navigate])

  useEffect(() => {
    if (loadedPost) {
      setLoading(false);
    }
  }, [loadedPost ])

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`${process.env.REACT_APP_API_BASE}/posts/${id}`, {
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
    setLoading(true)

    // input validation
    let img = e.target.files.value;
    if (!img) {
      setLoading(false)
      alert('Image required');
      return;
    }



    let title = e.target.txtTitle.value;
    let description = e.target.txtDescription.value;
    let imagePath = '';

    const res = await fetch(`${process.env.REACT_APP_API_BASE}/files`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + user.token,
      },
      body: new FormData(e.target),
    });
    const body = await res.json();

    let url = `${process.env.REACT_APP_API_BASE}/posts`;
    let method = 'POST';

    if (id) {
      url = `${url}/${id}`;
      method = 'PATCH'
    }

    const postBody = { title, description };

    if (body.files && body.files.length > 0) {
      imagePath = body.files[0].originalname;
      postBody.imagePath = imagePath;
    }

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token,
      },
      body: JSON.stringify(postBody)
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
    })
  }

  useEffect(() => {
    if (img) {
      setLoading(false);
    }
  }, [img]);


  useEffect(() => {
    if (loadedPost?.imagePath) {
      fetch(`${process.env.REACT_APP_API_BASE}/files/${loadedPost.imagePath}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + user.token,
          'Accept': 'application/json'
        }
      }).then(response => {
        if (!response.ok) {
          throw new Error('The following error has occured: ' + response.statusText)
        } else {
          return response;
        }
      })
        // Retrieve its body as ReadableStream
        .then(response => {
          const reader = response.body.getReader();
          return new ReadableStream({
            start(controller) {
              return pump();
              function pump() {
                return reader.read().then(({ done, value }) => {
                  // When no more data needs to be consumed, close the stream
                  if (done) {
                    controller.close();
                    return;
                  }
                  // Enqueue the next data chunk into our target stream
                  controller.enqueue(value);
                  return pump();
                });
              }
            }
          })
        })
        // Create a new response out of the stream
        .then(stream => new Response(stream))
        // Create an object URL for the response
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
        // Update image
        .then(url => { setImg(url); })
        .catch(error => {
          console.log(error);
          setLoading(false);
        })

    }

    else {
      setImg(require('./../../images/girl-red-hair.jpg'));
    }
  }
    , [loadedPost, user.token])

  if (isLoading) {
    return <Spinner />
  } else {
    return (
      <div className="addPost">
        <img className="addPostImg" src={img} alt="girl reading book" />
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
              id="txtTitle"
              defaultValue={loadedPost?.title}
              />
          </div>
          <div className="addPostGroup">
            <textarea placeholder="Add description..."
              type="text"
              className="addPostInput addText"
              name="txtDescription"
              id="txtDescription"
              defaultValue={loadedPost?.description}>

            </textarea>
          </div>
          <button className="addSubmit" type="submit" id="btnPublish">Publish</button>
        </form>
      </div>
    )
  }
}
