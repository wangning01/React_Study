import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
import axiosClient from '../util/axiosClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = async (email, password) => {
    const response = await axiosClient.post('/api/login', { email, password });
    localStorage.setItem('token', response.data.token);
    setUser({ token: response.data.token });
  };

  
  const register = async (email, password) => {
    let regResponse;
    console.log('in method register');
    await axiosClient
      .post('/api/register', { email, password })
      .then((response) => {regResponse = response;})
      .catch((error) => {regResponse = error;});
    return regResponse;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
