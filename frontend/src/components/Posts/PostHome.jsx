import React, { useState } from 'react';
import PostForm from './PostForm';
import PostList from './PostList';

const PostHome = () => {
  const [refresh, setRefresh] = useState(false);

  const handlePostCreated = () => {
    setRefresh(!refresh); // force re-render of PostList
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Post</h2>
      <PostForm onPostCreated={handlePostCreated} />
      <PostList key={refresh} />
    </div>
  );
};

export default PostHome;
