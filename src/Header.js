import React, { useContext, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:3001/profile', {
      credentials: 'include',
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);

        //Trang chủ
        <Navigate to={'/'} />;
        // Làm mới trang
        // window.location.reload();
      });
    });
  }, [setUserInfo]);

  const logout = () => {
    fetch('http://localhost:3001/logout', {
      credentials: 'include',
      method: 'POST',
    }).then(() => {
      setUserInfo(null);
    });
  };

  const username = userInfo?.username;

  return (
    <header>
      <Link to='/' className='logo'>
        MyBlog
      </Link>
      <nav>
        {username ? (
          <>
            <Link to='/create'>Create new post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
