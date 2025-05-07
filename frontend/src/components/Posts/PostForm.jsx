import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PostForm.css';  // Import custom CSS for post form

const PostForm = () => {
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('file', file);

    try {
      await axios.post('http://localhost:8080/posts/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Post created successfully!');
      navigate('/posts');
    } catch (error) {
      console.error(error);
      alert('Error submitting the post. Please try again.');
    }
  };

  return (
    <div className="container mt-5 post-form-container">
      <h2 className="mb-4 text-center">Create a New Post</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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

        <div className="mb-3">
          <label htmlFor="file" className="form-label">Upload Photo/Video</label>
          <input
            type="file"
            id="file"
            className="form-control"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" className="btn btn-warning btn-lg mt-4">Upload Post</button>
      </form>
    </div>
  );
};

export default PostForm;
