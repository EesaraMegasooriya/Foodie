import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleReaction = async (postId, type) => {
    try {
      await axios.post(`http://localhost:8080/api/posts/${postId}/react`, null, {
        params: {
          userId: 1, // placeholder, replace with actual user ID
          type: type // "like" or "unlike"
        }
      });
      fetchPosts(); // refresh to update reaction count
    } catch (error) {
      console.error('Error reacting to post:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h3>All Posts</h3>
      {posts.map((post) => (
        <div key={post.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.description}</p>

            <div>
              <button
                className="btn btn-success btn-sm me-2"
                onClick={() => handleReaction(post.id, 'like')}
              >
                Like
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleReaction(post.id, 'unlike')}
              >
                Unlike
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
