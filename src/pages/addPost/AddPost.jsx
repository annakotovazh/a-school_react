import {React, useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom'
import "./addPost.css";
import Spinner from "../../components/helpercomponents/Spinner";

export default function AddPost() {
    const addPostImg = require('./../../images/girl-red-hair.jpg');
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [post, setPost] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if(post !== null){
          setLoading(false)
          navigate('/schoolclass')
        }
    }, [post])
    
    const HandleSubmit = async e =>{
        e.preventDefault();
        setLoading(true)


    
        // input validation required
      let title = e.target.txtTitle.value;
      let description = e.target.txtDescription.value;
      let imagePath = '';

      await new Promise(f => setTimeout(f, 500));

        e.preventDefault();
        const res = await fetch('http://localhost:3000/files', {
          method: 'POST',
          body: new FormData(e.target),
        });
      const body = await res.json();
      console.log(body);

      if (body.files && body.files.length > 0) { 
        imagePath = body.files[0].originalname;
      }
        fetch('http://localhost:3000/posts', {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify({title, description, imagePath})
        }).then(response => {
          if(!response.ok){
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
                            autoFocus={true}
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
