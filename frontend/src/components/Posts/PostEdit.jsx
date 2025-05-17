import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';

export default function PostEdit({ currentUserId }) {
  const { id } = useParams();
  const nav = useNavigate();
  const [caption, setCaption] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // load existing post
    api.get(`/posts/${id}`)
      .then(({ data }) => {
        setCaption(data.caption);
        // we won’t preload media files into inputs; user can re-upload if desired
      })
      .catch(() => setError('Failed to load post.'));
  }, [id]);

  const handleFileChange = e => {
    const arr = Array.from(e.target.files).slice(0,3);
    setFiles(arr);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!caption.trim()) {
      return setError('Caption is required.');
    }
    const fd = new FormData();
    fd.append('caption', caption);
    fd.append('userId', currentUserId);
    files.forEach(f => fd.append('files', f));

    try {
      await api.put(`/posts/${id}`, fd, {
        headers: {'Content-Type':'multipart/form-data'}
      });
      nav('/');
    } catch {
      setError('Update failed.');
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5>Edit Post</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="3"
              value={caption}
              onChange={e => setCaption(e.target.value)}
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
              Select up to 3 new files to replace existing media (optional).
            </small>
          </div>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
  );
}
