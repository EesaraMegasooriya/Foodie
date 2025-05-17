import React, { useState } from 'react';
import './CommentForm.css';

export default function CommentForm({ onSubmit }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSubmit(trimmed, () => setText(''));
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        className="form-control"
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
}
