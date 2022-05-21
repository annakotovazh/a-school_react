import { useState } from 'react';

export default function UseToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      user.token = tokenString;
    }
    return user;
  };

  const [user, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', userToken.token);
    localStorage.setItem('user', JSON.stringify({ id: userToken.id, role: userToken.role, img: userToken.imagePath }));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    user
  }
}