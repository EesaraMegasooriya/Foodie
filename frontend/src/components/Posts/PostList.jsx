import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(`http://localhost:8080/posts/${postId}/like`);
      fetchPosts(); // refresh posts
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleCommentChange = (postId, value) => {
    setNewComment((prev) => ({ ...prev, [postId]: value }));
  };

  const handleAddComment = async (postId) => {
    try {
      await axios.post(`http://localhost:8080/posts/${postId}/comment`, newComment[postId], {
        headers: {
          'Content-Type': 'text/plain', // because only text is sent
        },
      });
      setNewComment((prev) => ({ ...prev, [postId]: '' })); // clear input
      fetchPosts(); // refresh posts
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>All Posts</h2>
      {posts.map((post) => (
        <div key={post.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{post.caption}</h5>
            <p className="card-text">Likes: {post.likes}</p>
            <button
              className="btn btn-outline-primary btn-sm me-2"
              onClick={() => handleLike(post.id)}
            >
              Like ❤️
            </button>

            {/* Comment input */}
            <div className="mt-3">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Add a comment..."
                value={newComment[post.id] || ''}
                onChange={(e) => handleCommentChange(post.id, e.target.value)}
              />
              <button
                className="btn btn-success btn-sm"
                onClick={() => handleAddComment(post.id)}
              >
                Comment 💬
              </button>
            </div>

            {/* Show comments */}
            {post.comments && post.comments.length > 0 && (
              <div className="mt-3">
                <h6>Comments:</h6>
                <ul className="list-group">
                  {post.comments.map((comment, index) => (
                    <li key={index} className="list-group-item">
                      {comment}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
