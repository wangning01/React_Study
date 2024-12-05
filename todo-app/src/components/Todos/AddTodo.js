import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const AddTodo = () => {
  const { user } = useContext(AuthContext);
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/todos', { text }, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} required />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodo;
