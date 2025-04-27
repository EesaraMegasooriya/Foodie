import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PostHome = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/posts'); // Backend endpoint to fetch posts
        setPosts(response.data);
      } catch (error) {
        setError('Error fetching posts. Please try again.');
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="post-home-container">
      <h2>All Posts</h2>

      {error && <div className="error">{error}</div>}

      <div className="post-list">
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              {/* Display the image/video */}
              <img src={`http://localhost:8080/uploads/${post.image}`} alt={post.title} />
            </div>
          ))
        )}
      </div>

      <div className="create-post-button">
        <Link to="/posts/create">
          <button>Create New Post</button>
        </Link>
      </div>
    </div>
  );
};

export default PostHome;
