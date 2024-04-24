import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Editor from '../Editor';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');

  const createNewPost = async (ev) => {
    ev.preventDefault();

    // Kiểm tra dữ liệu đầu vào
    if (!title.trim() || !summary.trim() || !content.trim() || !files) {
      setError('Please fill in all fields');
      return;
    }

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);

    try {
      const response = await fetch('http://localhost:3001/create', {
        method: 'POST',
        body: data,
        credentials: 'include',
      });

      if (response.ok) {
        setRedirect(true);
      } else {
        setError('Failed to create post');
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <form onSubmit={createNewPost}>
      {error && <div>{error}</div>}
      <input
        type='title'
        placeholder={'Title'}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type='summary'
        placeholder={'Summary'}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input type='file' onChange={(ev) => setFiles(ev.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: '5px' }}>Create post</button>
    </form>
  );
};

export default CreatePost;
