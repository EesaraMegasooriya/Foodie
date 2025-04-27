import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostsHome = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/posts'); // Backend endpoint to fetch posts
        setPosts(response.data);
      } catch (error) {
        setError('Error fetching posts. Please try again.');
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mt-5">
      <h2>All Posts</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="col-md-4 mb-4">
              <div className="card">
                <img src={`http://localhost:8080/uploads/${post.image}`} className="card-img-top" alt={post.caption} />
                <div className="card-body">
                  <h5 className="card-title">{post.caption}</h5>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-primary">Like {post.likes}</button>
                    <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target={`#commentsModal${post.id}`}>
                      Comments {post.comments.length}
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments Modal */}
              <div className="modal fade" id={`commentsModal${post.id}`} tabIndex="-1" aria-labelledby={`commentsModalLabel${post.id}`} aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id={`commentsModalLabel${post.id}`}>Comments</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <ul className="list-group">
                        {post.comments.map((comment, index) => (
                          <li key={index} className="list-group-item">{comment}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="text-center mt-4">
        <Link to="/posts/create">
          <button className="btn btn-warning">Create New Post</button>
        </Link>
      </div>
    </div>
  );
};

export default PostsHome;
