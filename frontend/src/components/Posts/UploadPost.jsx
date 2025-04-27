import React, { useState } from 'react';
import axios from 'axios';

function UploadPost() {
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!caption || !file) {
      alert('Caption and File are required!');
      return;
    }

    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/posts/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      alert('Post uploaded successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to upload post');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Caption:</label>
        <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} />
      </div>
      <div>
        <label>Photo/Video:</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      </div>
      <button type="submit">Upload Post</button>
    </form>
  );
}

export default UploadPost;
