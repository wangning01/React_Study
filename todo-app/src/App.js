import React from 'react';
import { AuthProvider } from './context/AuthContext';
import RegisterForm from './components/Auth/RegisterForm';
import Login from './components/Auth/Login';
import TodoList from './components/Todos/TodoList';
import AddTodo from './components/Todos/AddTodo';

const App = () => {
  return (
    <AuthProvider>
      <div className='container'>
        <h1>Todo App</h1>
        <RegisterForm />
        <Login />
        <AddTodo />
        <TodoList />
      </div>
    </AuthProvider>
  );
};

export default App;
