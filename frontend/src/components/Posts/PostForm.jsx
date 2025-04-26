import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title,
      description,
      userId: 1 // temporary placeholder, replace with real user ID if available
    };

    try {
      await axios.post('http://localhost:8080/api/posts', newPost);
      setTitle('');
      setDescription('');
      onPostCreated(); // to refresh post list if needed
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h3>Create New Post</h3>
      <div className="form-group mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-2">
        <textarea
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Post</button>
    </form>
  );
};

export default PostForm;
