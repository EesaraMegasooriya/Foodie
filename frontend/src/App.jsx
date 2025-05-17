import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import PostFeed from './components/Posts/PostFeed';
import PostForm from './components/Posts/PostForm';

export default function App() {
  return (
    <div className="container mt-4">
      {/* Navigation */}
      <nav className="nav mb-4">
        <NavLink 
          to="/" 
          end 
          className={({ isActive }) => 
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Feed
        </NavLink>
        <NavLink 
          to="/posts/new" 
          className={({ isActive }) => 
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          New Post
        </NavLink>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<PostFeed />} />
        <Route path="/posts/new" element={<PostForm />} />
      </Routes>
    </div>
  );
}
