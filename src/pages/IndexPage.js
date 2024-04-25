import React, { useEffect, useState } from 'react';
import Post from '../Post';

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/post').then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <div className='main-content'>
      {posts.length > 0 && posts.map((post) => <Post {...post} />)}
    </div>
  );
};

export default IndexPage;
