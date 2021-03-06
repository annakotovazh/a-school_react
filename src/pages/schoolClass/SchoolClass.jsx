import { React, useState, useEffect } from "react";
import "./schoolClass.css";
import Spinner from "../../components/helpercomponents/Spinner";
import SinglePost from "../../components/singlePost/SinglePost";
import UseToken from '../../useToken';


export default function SchoolClass() {

  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const { user } = UseToken();

  useEffect(() => {
    if (posts !== []) {
      setLoading(false);
    }
  }, [posts])

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_BASE}/posts?filter={"order":"postId desc"}`, {
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
      setPosts(data);
    }).catch(error => {
      alert(error)
      setLoading(false)
    })
  }, [user.token])

  if (isLoading) {
    return <Spinner />
  } else {
    return (
      <div className="schoolClass">

        {posts.map((post, i) => (
          <SinglePost key={i} item={post} />
        ))}


      </div>
    )
  }
}
