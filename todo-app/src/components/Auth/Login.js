import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Email' />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
