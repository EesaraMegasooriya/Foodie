// src/components/Posts/PostsHome.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PostsHome.css';

export default function PostsHome() {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/posts')
      .then(res => setPosts(res.data))
      .catch(() => setError('Failed to fetch posts.'));
  }, []);

  const like = id => {
    axios.post(`/posts/${id}/like`)
      .then(() => {
        setPosts(ps => ps.map(p => p.id===id?{...p,likes:p.likes+1}:p));
      })
      .catch(() => setError('Error liking post.'));
  };

  const unlike = id => {
    axios.post(`/posts/${id}/unlike`)
      .then(() => {
        setPosts(ps => ps.map(p => p.id===id?{...p,likes:p.likes-1}:p));
      })
      .catch(() => setError('Error unliking post.'));
  };

  const postComment = id => {
    const txt = (commentText[id]||'').trim();
    if(!txt) return;
    axios.post(`/posts/${id}/comment`, { comment: txt })
      .then(() => {
        setPosts(ps => ps.map(p =>
          p.id===id?{...p,comments:[...p.comments,txt]}:p
        ));
        setCommentText(ct => ({ ...ct, [id]: '' }));
      })
      .catch(() => setError('Error adding comment.'));
  };

  return (
    <div className="container mt-5">
      <h2>All Posts</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {posts.map(p => (
          <div key={p.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="media-grid mb-2">
                  {p.mediaPaths.map((url,i) =>
                    url.endsWith('.mp4')
                      ? <video key={i} controls className="media-item" src={url}/>
                      : <img    key={i} className="media-item" src={url} alt="media"/>
                  )}
                </div>
                <p><strong>{p.caption}</strong></p>
                <button className="btn btn-outline-danger btn-sm me-2" onClick={()=>like(p.id)}>
                  ❤️ {p.likes}
                </button>
                <button className="btn btn-outline-secondary btn-sm me-2" onClick={()=>unlike(p.id)}>
                  💔
                </button>
                <h6 className="mt-3">Comments ({p.comments.length})</h6>
                <ul className="list-group mb-2">
                  {p.comments.map((c,i)=><li key={i} className="list-group-item">{c}</li>)}
                </ul>
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Add comment..."
                    value={commentText[p.id]||''}
                    onChange={e=>setCommentText(ct=>({...ct,[p.id]:e.target.value}))}
                  />
                  <button className="btn btn-primary" onClick={()=>postComment(p.id)}>
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Link to="/posts/create">
          <button className="btn btn-warning">Create New Post</button>
        </Link>
      </div>
    </div>
  );
}
