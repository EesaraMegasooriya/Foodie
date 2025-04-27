import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PostForm.css';  // Import custom CSS for post form

const PostForm = () => {
  const [caption, setCaption] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with caption only
    const postData = { caption };

    try {
      // Send POST request to backend
      await axios.post('http://localhost:8080/posts/upload', postData, {
        headers: {
          'Content-Type': 'application/json', // Ensure we send JSON
        },
      });

      alert('Post created successfully!');
      navigate('/posts');  // Redirect to posts page after success
    } catch (error) {
      console.error(error);
      alert('Error submitting the post. Please try again.');
    }
  };

  return (
    <div className="container mt-5 post-form-container">
      <h2 className="mb-4 text-center">Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="caption" className="form-label">Title</label>
          <input
            type="text"
            id="caption"
            className="form-control"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-warning btn-lg mt-4">Upload Post</button>
      </form>
    </div>
  );
};

export default PostForm;
