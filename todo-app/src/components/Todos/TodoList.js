import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchTodos = async () => {
        const response = await axios.get('/api/todos', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTodos(response.data);
      };
      fetchTodos();
    }
  }, [user]);

  const deleteTodo = async (id) => {
    await axios.delete(`/api/todos/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} />
      ))}
    </ul>
  );
};

export default TodoList;
