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
      <h2 className="mb-4">All Posts</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm rounded-3">
                {/* Post Header */}
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src="/userimage.png" width="70" className="rounded-circle" alt="User Avatar" />
                    <span className="ms-2">User Name</span>
                  </div>
                  <button className="btn btn-light" style={{ border: 'none' }}>...</button>
                </div>

                {/* Post Image */}
                <img src={`/image.png`} className="card-img-top" alt={post.caption} />

                {/* Post Actions */}
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <button className="btn btn-link p-0">
                        <i className="bi bi-heart"></i> {post.likes} Likes
                      </button>
                      <button className="btn btn-link p-0" data-bs-toggle="modal" data-bs-target={`#commentsModal${post.id}`}>
                        <i className="bi bi-chat-dots"></i> {post.comments.length} Comments
                      </button>
                    </div>
                    <button className="btn btn-link p-0">
                      <i className="bi bi-bookmark"></i> Save
                    </button>
                  </div>

                  {/* Post Caption */}
                  <p className="mt-2"><strong></strong> {post.caption}</p>

                  {/* Modal for Comments */}
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
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create New Post Button */}
      <div className="text-center mt-4">
        <Link to="/posts/create">
          <button className="btn btn-warning">Create New Post</button>
        </Link>
      </div>
    </div>
  );
};

export default PostsHome;
