import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');

  const register = async (ev) => {
    ev.preventDefault();

    // Xác thực dữ liệu đầu vào
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    const response = await fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.ok) {
      alert('Registration successful');
      setRedirect(true);
    } else {
      const errorMessage = await response.text();
      setError(errorMessage || 'Registration failed');
    }
  };

  if (redirect) {
    return <Navigate to='/login' replace />;
  }

  return (
    <div className='main-content'>
      <form className='register' onSubmit={register}>
        <h1>Register</h1>
        {error && <div className='error'>{error}</div>}
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
