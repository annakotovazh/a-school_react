import { React, useState, useEffect } from "react";
import "./users.css";
import Spinner from "../../components/helpercomponents/Spinner";
import SingleUser from "../../components/singleUser/SingleUser";
import UseToken from '../../useToken';
//import { useNavigate } from 'react-router-dom';

export default function Users({ ip }) {

  
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const { user } = UseToken();
  //const navigate = useNavigate();

  console.log({ ip });

  if (process.env.REACT_APP_IP_WHITELIST) {
    const whitelist = process.env.REACT_APP_IP_WHITELIST.split(',');
    if (!whitelist.includes(ip)) { 
      alert(`Your IP [${ip}] is not in the whitelist!`);
      window.location.pathname = '/';
      
      //navigate('/');
    }
  }

  useEffect(() => {
    if (posts !== []) {
      setLoading(false);
    }
  }, [posts])

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_BASE}/user-profiles?filter={"include":[{"relation":"role"}]}`, {
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
      <div className="user">

        {posts.map((post, i) => (
          <SingleUser key={i} item={post} />
        ))}


      </div>
    )
  }
}
