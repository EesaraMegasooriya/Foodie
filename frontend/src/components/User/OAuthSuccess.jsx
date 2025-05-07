import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // make sure path is correct

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // use login from context

  useEffect(() => {
    const fetchJwt = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/auth/google/success', {
          withCredentials: true,
        });

        const { token, user } = response.data;

        // Store in localStorage
        localStorage.setItem('jwt', token);
        localStorage.setItem('user', JSON.stringify(user));

        login(user); // update context → Header will refresh!

        navigate('/');
      } catch (error) {
        console.error('Failed to fetch JWT from backend:', error);
        navigate('/login');
      }
    };

    fetchJwt();
  }, [navigate, login]);

  return <div>Logging you in via Google...</div>;
};

export default OAuthSuccess;
