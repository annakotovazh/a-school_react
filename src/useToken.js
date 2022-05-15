import { useState } from 'react';

export default function UseToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    //const userToken = JSON.parse(tokenString);
    //return userToken?.token
    return tokenString;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken.token));
    localStorage.setItem('user', JSON.stringify({ id:userToken.id, role:userToken.role, img:userToken.imagePath }));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}