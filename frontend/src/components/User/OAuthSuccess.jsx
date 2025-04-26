import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJwt = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/auth/google/success', {
          withCredentials: true,
        });

        const { token,name  } = response.data;
        localStorage.setItem('jwt', token);
        localStorage.setItem('name', name);
        console.log('✅ JWT stored:', token);
        

        // Redirect to home, events page, or dashboard
        navigate('/');
      } catch (error) {
        console.error('❌ Failed to fetch JWT from backend:', error);
      }
    };

    fetchJwt();
  }, [navigate]);

  return <div>Logging you in via Google...</div>;
};

export default OAuthSuccess;
