import { useState } from 'react';
import authContext from './authContext';

const AuthState = (props) => {
  const host = 'http://localhost:5000/users';
  const [user, setUser] = useState(null);

  const registerUser = async (name, email, password) => {
    try {
      const response = await fetch(`${host}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
      localStorage.setItem('token', json.token);
      getUser(json.token);  
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await fetch(`${host}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(email);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
      localStorage.setItem('token', json.token);
      getUser(json.token);  
    } catch (error) {
      console.error('Error logging in user:', error);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const getUser = async (token) => {
    try {
      const response = await fetch(`${host}/user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
      setUser(json);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  return (
    <authContext.Provider value={{ user, registerUser, loginUser, logoutUser, getUser }}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
