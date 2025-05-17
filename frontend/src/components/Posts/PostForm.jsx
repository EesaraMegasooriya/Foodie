import React, { useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

export default function PostForm({ currentUserId }) {
  const [caption, setCaption] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files).slice(0, 3);
    if (selected.length > 3) {
      setError('You can upload up to 3 files only.');
      return;
    }
    setError('');
    setFiles(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caption.trim() && files.length === 0) {
      setError('Please add a caption or at least one media file.');
      return;
    }
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('userId', currentUserId);
    files.forEach((file) => formData.append('files', file));

    try {
      await api.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Failed to create post. Please try again.');
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5>Create New Post</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              accept="image/*,video/*"
              multiple
              onChange={handleFileChange}
            />
            <small className="form-text text-muted">
              You may select up to 3 files.
            </small>
          </div>
          <button type="submit" className="btn btn-primary">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
