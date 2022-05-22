import { React, useState, useEffect } from "react";
import "./singlePost.css"
import UseToken from '../../useToken';


export default function SinglePost({ item }) {
  let { title, description, dateCreated, imagePath, postId } = item;
  const [img, setImg] = useState('');
  const [isLoading, setLoading] = useState(false);
  const { user } = UseToken();

  const handleDelete = async (e, id) => {
    if (window.confirm('Delete post?')) {
      if (id) {
        fetch(`${process.env.REACT_APP_API_BASE}/posts/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + user.token,
            'Content-Type': 'application/json'
          }
        }).then(response => {
          if (!response.ok) {
            throw new Error('An error has occured: ' + response.statusText)
          } else {
            window.location.pathname = '/schoolclass';
            //navigate('/schoolclass');
          }
        }).catch(error => {
          alert(error);
        })
      }
    }
  }

  useEffect(() => {
    if (img) {
      setLoading(false);
    }
  }, [img]);


  useEffect(() => {
    if (imagePath) {
      fetch(`${process.env.REACT_APP_API_BASE}/files/${imagePath}`, {
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
      setImg(require('./../../images/kids_handsup.jpg'));
    }
  }
    , [imagePath, user.token])


  if (isLoading) {
    return <div>Loading</div>
  } else {
    return (
      <div className="schoolClassItem">
        <img className="schoolClassImg" src={img} alt="" />
        <div className="schoolClassPostInfo">
          <div className="text-uppercase schoolClassPostTitle">{title}</div>
          <div className="schoolClassPostText">
            <p>{description}</p>
          </div>
        </div>
        <div className="schoolClassPostDate">
          <span className="skcPostDate">Date: {(new Date(dateCreated).toLocaleDateString("en-AU"))}</span> {(user?.role === 'admin' || user?.role === 'teacher') ? <i className="singlePostIcon fa-solid fa-trash" onClick={(e) => handleDelete(e, postId)}></i> : ''}
        </div>

      </div>
    )
  }
}
