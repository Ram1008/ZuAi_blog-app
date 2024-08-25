import { useState } from 'react';
import authContext from './authContext';
import { APP_Host } from '../../constants/appContants';

const AuthState = (props) => {
  const url = `${APP_Host}/users/`;
  const [user, setUser] = useState(null);

  const registerUser = async (name, email, password) => {
    try {
      const response = await fetch(`${url}/register`, {
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
      const response = await fetch(`${url}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
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
      const response = await fetch(`${url}/user`, {
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
      return json;
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
