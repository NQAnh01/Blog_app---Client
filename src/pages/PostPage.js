import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatISO9075 } from 'date-fns';

import { UserContext } from '../UserContext';
import { Image } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3001/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  if (!postInfo) return '';
  return (
    <div className='main-content'>
      <div className='post-page'>
        <h1>{postInfo.title}</h1>
        <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
        <div className='author'>by @{postInfo.author.username}</div>
        {userInfo.id === postInfo.author._id && (
          <div className='edit-row'>
            <Link className='edit-btn' to={`/edit/${postInfo._id}`}>
              <EditOutlined />
              Edit this post
            </Link>
          </div>
        )}
        <div className='image' style={{ justifyContent: 'center' }}>
          <Image src={`http://localhost:3001/${postInfo.cover}`} alt='' width={500} />
        </div>
        <div className='content' dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      </div>
    </div>
  );
};

export default PostPage;
