import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      navigate('/'); //  Redirect to homepage if already logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8080/api/auth/register', formData);
      alert('Registration successful!');
      console.log(res.data);
      // Optional: redirect to login or dashboard
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed.');
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>

      {/* Email/Password Form */}
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Register with Email</button>
      </form>

      <hr className="my-4" />

      {/* Google Button */}
      <div className="text-center">
        <button className="btn btn-danger w-100" onClick={handleGoogleAuth}>
          <i className="bi bi-google"></i> Register with Google
        </button>
      </div>
    </div>
  );
}

export default Register;
