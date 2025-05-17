// src/components/Posts/UploadPost.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UploadPost.css';

export default function UploadPost(){
  const [caption,setCap]=useState('');
  const [files,setFiles]=useState([]);
  const [error,setErr]=useState('');
  const nav=useNavigate();

  const onFileChange=e=>{
    const arr=Array.from(e.target.files);
    if(arr.length>3) return setErr('Max 3 files');
    setErr(''); setFiles(arr);
  };

  const onSubmit=async e=>{
    e.preventDefault();
    if(!caption.trim()) return setErr('Caption required');
    if(caption.length>200) return setErr('Max 200 chars');
    if(files.length===0) return setErr('Select 1–3 files');
    const fd=new FormData();
    fd.append('caption',caption);
    files.forEach(f=>fd.append('files',f));
    try{
      await axios.post('/posts/upload',fd,{
        headers:{'Content-Type':'multipart/form-data'}
      });
      nav('/posts');
    }catch{
      setErr('Upload failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create a New Post</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label>Caption</label>
          <input
            type="text"
            className="form-control"
            maxLength={200}
            value={caption}
            onChange={e=>setCap(e.target.value)}
          />
          <div className="form-text">{caption.length}/200</div>
        </div>
        <div className="mb-3">
          <label>Photos/Videos (1–3)</label>
          <input
            type="file"
            className="form-control"
            accept="image/*,video/*"
            multiple
            onChange={onFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Upload Post</button>
      </form>
    </div>
  );
}
