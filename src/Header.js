import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { Button, Image, Input, Space, Tooltip } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import logo from './Logo.png';

const { Search } = Input;

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/profile', {
      credentials: 'include',
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        navigate('/');
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

  const content = (
    <div className='header-items'>
      <p className='header-item'>Edit profile</p>
      <p className='header-item'>My blog</p>
      <hr />
      <p className='header-item' onClick={logout}>
        Logout
      </p>
    </div>
  );

  const username = userInfo?.username;

  return (
    <header id='myHeader'>
      <Link to='/' className='logo' style={{ display: 'flex', alignItems: 'center' }}>
        <Image src={logo} alt='' width={56} style={{ borderRadius: '999px' }} />
        <p style={{ paddingLeft: '6px' }}>MyBlog</p>
      </Link>
      <div class='Search'>
        <Space className='centered-space'>
          <Search
            placeholder='input search text'
            allowClear
            prefix={<SearchOutlined />}
            enterButton='Search'
            onSearch={(value) => {
              navigate(`/search?q=${value}`);
            }}
          />
        </Space>
      </div>
      <nav>
        {username ? (
          <>
            <Tooltip title='Create a new post'>
              <Button
                onClick={() => {
                  navigate('/create');
                }}
              >
                <PlusOutlined />
              </Button>
            </Tooltip>
            <Tooltip
              // open='true'
              title={content}
              color='white'
              style={{
                width: '128px',
              }}
            >
              {username}
            </Tooltip>
          </>
        ) : (
          <>
            <button
              className='btn-login'
              onClick={() => {
                navigate('/login');
              }}
            >
              Login
            </button>
            <button
              className='btn-register'
              onClick={() => {
                navigate('/register');
              }}
            >
              Register
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
