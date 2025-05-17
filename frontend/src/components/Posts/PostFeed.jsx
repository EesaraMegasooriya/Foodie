import React, { useEffect, useState } from 'react';
import api from '../../api';
import PostCard from './PostCard';
import './PostFeed.css';

export default function PostFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/posts');
      setPosts(data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)   return <div className="loading">Loading posts…</div>;
  if (!posts.length) return <div className="no-posts">No posts yet.</div>;

  // Sort newest first
  const sorted = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="post-feed">
      {sorted.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLikeToggle={fetchPosts}
          onCommentAdded={fetchPosts}
          currentUserId={/* pass in your logged-in user ID */}
        />
      ))}
    </div>
  );
}
