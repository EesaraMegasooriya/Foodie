import React from 'react';
import './CommentList.css';


export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <div className="text-muted">No comments yet.</div>;
  }

  return (
    <ul className="list-group list-group-flush mb-2">
      {comments.map((c) => (
        <li key={c.id} className="list-group-item">
          <strong className="me-2">{c.user.username || 'User'}:</strong>
          {c.text}
          <div className="text-muted small">{new Date(c.createdAt).toLocaleString()}</div>
        </li>
      ))}
    </ul>
  );
}
