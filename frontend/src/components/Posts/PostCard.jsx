import React, { useState, useEffect } from 'react';
import api from '../../api';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import './PostCard.css';


export default function PostCard({ post, onLikeToggle, onCommentAdded, currentUserId }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);

  // On mount, check if current user already liked this post
  useEffect(() => {
    async function fetchLikeStatus() {
      try {
        const { data } = await api.get(
          `/posts/${post.id}/likes/count`,
          { params: { userId: currentUserId } }
        );
        // If count for this user is 1, mark as liked
        setLiked(data > 0);
      } catch (err) {
        console.error('Error fetching like status', err);
      }
    }
    fetchLikeStatus();
  }, [post.id, currentUserId]);

  const handleLikeToggle = async () => {
    try {
      await api.post(
        `/posts/${post.id}/likes`,
        null,
        { params: { userId: currentUserId } }
      );
      // Optimistically update UI
      setLiked(!liked);
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
      onLikeToggle();
    } catch (err) {
      console.error('Error toggling like', err);
    }
  };

  const handleCommentSubmit = async (text, resetInput) => {
    try {
      await api.post(
        `/posts/${post.id}/comments`,
        null,
        { params: { userId: currentUserId, text } }
      );
      onCommentAdded();
      resetInput();
    } catch (err) {
      console.error('Error adding comment', err);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        {/* Media grid */}
        <div className="media-grid mb-3">
          {post.media.map((m, idx) =>
            m.fileType.startsWith('video') ? (
              <video
                key={idx}
                controls
                className="media-item"
                src={`/files/${m.fileName}`}
              />
            ) : (
              <img
                key={idx}
                className="media-item"
                src={`/files/${m.fileName}`}
                alt="Post media"
              />
            )
          )}
        </div>

        {/* Caption */}
        <p>{post.caption}</p>

        {/* Like button */}
        <button
          className={`btn btn-sm ${
            liked ? 'btn-danger' : 'btn-outline-danger'
          } me-2`}
          onClick={handleLikeToggle}
        >
          ❤️ {likeCount}
        </button>

        {/* Comments */}
        <div className="mt-4">
          <CommentList comments={post.comments} />
          <CommentForm onSubmit={handleCommentSubmit} />
        </div>
      </div>
    </div>
  );
}
