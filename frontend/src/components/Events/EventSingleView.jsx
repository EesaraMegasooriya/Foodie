import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaHeart, FaShareAlt,FaExternalLinkAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


function EventSingleView() {
  const navigate = useNavigate();
const [isRegistered, setIsRegistered] = useState(false);


  const { id } = useParams(); // Get :id from URL
  const [event, setEvent] = useState(null);
  const [comments, setComments] = useState([]);
const [newComment, setNewComment] = useState('');
const [currentUserId, setCurrentUserId] = useState(null);
const [editingCommentId, setEditingCommentId] = useState(null);
const [editingContent, setEditingContent] = useState('');
const [visibleComments, setVisibleComments] = useState(3);
const [isRegistering, setIsRegistering] = useState(false);







  

  useEffect(() => {
    axios.get(`http://localhost:8080/api/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(err => console.error("Error fetching event:", err));
  }, [id]);

  

  const handleShare = () => {
    const fullUrl = `${window.location.origin}${location.pathname}`;
    navigator.clipboard.writeText(fullUrl)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Copied!',
          text: 'Event link copied to clipboard',
          timer: 2000,
          showConfirmButton: false
        });
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Failed to copy the link.',
        });
      });
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/api/events/${id}/comments`)
      .then(res => setComments(res.data))
      .catch(err => console.error("Error fetching comments:", err));
    
    // Mock: Replace this with real user fetching logic
    const tokenUser = JSON.parse(localStorage.getItem('user'));
    if (tokenUser) {
      setCurrentUserId(tokenUser.id); // or tokenUser._id
    }
  }, [id]);

  // Place this outside all functions
useEffect(() => {
  const tokenUser = JSON.parse(localStorage.getItem("user"));
  if (tokenUser) {
    setCurrentUserId(tokenUser.id);
  }

  axios.get(`http://localhost:8080/api/events/${id}`)
    .then(res => {
      setEvent(res.data);
      if (res.data.registeredUsers && tokenUser) {
        setIsRegistered(res.data.registeredUsers.includes(tokenUser.id));
      }
    })
    .catch(err => console.error("Error fetching event:", err));
}, [id]);


  if (!event) return <div className="p-4">Loading event details...</div>;

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
  
    const token = localStorage.getItem("jwt");
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (!token || !user) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please log in to post a comment',
      });
      return;
    }
  
    try {
      await axios.post(`http://localhost:8080/api/events/${id}/comments`, {
        content: newComment,
        userId: user.id,
        username: user.name
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      const res = await axios.get(`http://localhost:8080/api/events/${id}/comments`);
      setComments(res.data);
      setNewComment('');
  
      // Toast-style success alert
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Comment posted successfully',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      });
    } catch (err) {
      console.error("Failed to post comment:", err);
      Swal.fire({
        icon: 'error',
        title: 'Comment Failed',
        text: 'Something went wrong while posting your comment.',
      });
    }
  };
  
  
  

  
  const handleDeleteComment = (commentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this comment?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const user = JSON.parse(localStorage.getItem("user"));
  
        axios.delete(`http://localhost:8080/api/comments/${commentId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            userId: user.id
          }
        })
        .then(() => {
          setComments(comments.filter(c => c.id !== commentId));
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Your comment has been deleted.',
            timer: 1500,
            showConfirmButton: false
          });
        })
        .catch(err => {
          console.error("Failed to delete comment:", err);
          Swal.fire({
            icon: 'error',
            title: 'Delete Failed',
            text: 'Could not delete the comment.',
          });
        });
      }
    });
  };
  
  

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  const handleUpdateComment = () => {
    if (!editingContent.trim()) return;
  
    const user = JSON.parse(localStorage.getItem("user"));
  
    axios.put(`http://localhost:8080/api/comments/${editingCommentId}`, {
      content: editingContent
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        userId: user.id  
      }
    })
      .then(res => {
        setComments(comments.map(c => c.id === editingCommentId ? res.data : c));
        setEditingCommentId(null);
        setEditingContent('');
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Your comment has been updated.',
          timer: 1500,
          showConfirmButton: false
        });
      })
      .catch(err => {
        console.error("Failed to update comment:", err);
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'Could not update the comment.',
        });
      });
  };
  

  const handleShowMore = () => {
    setVisibleComments(prev => prev + 3); // Load 3 more at a time
  };
  


  

  
  const handleRegister = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("jwt");
  
    if (!user || !token) {
      Swal.fire({ icon: 'warning', title: 'Login required to register' });
      return;
    }
  
    setIsRegistering(true); // start spinner
  
    try {
      const res = await axios.put(
        `http://localhost:8080/api/events/${id}/register?userId=${user.id}&email=${encodeURIComponent(user.email)}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setEvent(res.data);
      setIsRegistered(true);
    } catch (err) {
      console.error("Registration failed", err);
      Swal.fire({
        icon: 'error',
        title: 'Could not register',
        text: err.response?.data?.message || 'Unexpected error occurred.',
      });
    } finally {
      setIsRegistering(false); // stop spinner
    }
  };
  
  
  
  
  const handleUnregister = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axios.put(`http://localhost:8080/api/events/${id}/unregister?userId=${user.id}`);
      setEvent(res.data);
      setIsRegistered(false);
    } catch (err) {
      console.error("Unregister failed", err);
      Swal.fire({ icon: 'error', title: 'Could not unregister.' });
    }
  };
  
  
  

  return (
    
        
    <div style={{ backgroundColor: '#fff8e1', minHeight: '100vh' }} className="">
      <div className='p-2 d-flex justify-content-between'>
        <div className='p-5 w-75'>
          
              <div className='d-flex align-items-center justify-content-between'>
                <Badge bg=""style={{
        backgroundColor: '#f8c035',
        color: 'black',
        
      }} className="mb-2">{event.category}</Badge>
                <div className='d-flex gap-4 '>
                  <div>
                    
                  </div>
                  <div><Button
  onClick={handleShare}
  style={{
    backgroundColor: '#f8c035',
    color: 'black',
    
    border: 'none'
  }}
>
  <FaShareAlt className="me-2" /> Share This
</Button>
</div>
                </div>
              </div>
              
              
              <h2 className='pb-2 mt-3 text-center fw-bold w-100'>{event.title}</h2>

              <div>
                <div className='d-flex py-2 align-items-center'>
                  <FaCalendarAlt  className="me-2" />
                  <span>{event.eventDate} {event.eventTime}</span>
                </div>
                <div className='d-flex py-2 align-items-center'>
                      {event.type === 'Online' ? (
                        <>
                          <FaExternalLinkAlt className='me-2' />
                          <a href={event.link} target="_blank" rel="noopener noreferrer">
                            {event.link}
                          </a>
                        </>
                      ) : (
                        <>
                          <FaMapMarkerAlt className='me-2' />
                          <span>{event.location}</span>
                        </>
                      )}
                    </div>
                <div className='d-flex py-2 align-items-center'>
                  <FaUsers className="me-2" />
                  <span>{event.maxParticipants} participants</span>
                </div>
              </div>

              <div className='p-4 mt-4 bg-white rounded'>
                <h5 className='fw-bold'>About this Event</h5>
                <p>{event.description}</p>
              </div>

              <div className='mt-5'>
  <h5>Comments ({comments.length})</h5>

  {/* New Comment Input */}
  <textarea
    className='w-100 border border-light rounded p-4'
    rows={3}
    placeholder='Write a comment...'
    value={newComment}
    onChange={(e) => setNewComment(e.target.value)}
  ></textarea>

  <div className='d-flex justify-content-end mt-3'>
  <button
  className='btn fw-bold'
  style={{ backgroundColor: '#f8c035', color: 'black', border: 'none' }}
  onClick={handlePostComment}
>
  Post Comment
</button>

  </div>

  {/* Existing Comments List */}
  <div className='mt-4'>
  {comments.slice(0, visibleComments).map(comment => (
    <div key={comment.id} className="bg-light p-3 rounded mb-3">
      <div className='d-flex justify-content-between align-items-start'>
        <strong>{comment.username}</strong>
        {currentUserId === comment.userId && (
          <div>
            {editingCommentId !== comment.id ? (
              <>
                <button
                  className='btn btn-sm btn-outline-secondary me-2'
                  onClick={() => handleEditComment(comment)}
                >
                  Edit
                </button>
                <button
                  className='btn btn-sm btn-outline-danger'
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  Delete
                </button>
              </>
            ) : null}
          </div>
        )}
      </div>

      {editingCommentId === comment.id ? (
        <>
          <textarea
            className='form-control mt-2'
            rows={2}
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
          />
          <div className="mt-2 d-flex justify-content-end gap-2">
            <button className='btn btn-sm btn-success' onClick={handleUpdateComment}>Save</button>
            <button className='btn btn-sm btn-secondary' onClick={() => setEditingCommentId(null)}>Cancel</button>
          </div>
        </>
      ) : (
        <p className='mt-2'>{comment.content}</p>
      )}
    </div>
  ))}

  {/* Show More Button */}
  {visibleComments < comments.length && (
    <div className='d-flex justify-content-center mt-2'>
      <button className='btn btn-sm btn-outline-primary' onClick={handleShowMore}>
        Show More
      </button>
    </div>
  )}
</div>

</div>



            
        </div>
          <div className='w-25 mt-5 p-3 d-flex flex-column'>
            <div className='bg-white rounded p-4'>
            <h4 className='fw-bold '>Registration</h4>
            <div className='d-flex justify-content-between fw-semibold mt-3'>
              <p>Registration Fee:</p>
              <p className='text-color-blue' >$ {event.registrationFee}</p>
            </div>
            <div className=''>
  {isRegistered ? (
    <button
      className='btn w-100 fw-bold'
      onClick={handleUnregister}
      style={{
        border: '2px solid #f8c035',
        color: '#f8c035',
        backgroundColor: 'white'
      }}
    >
      Unregister
    </button>
  ) : (
    <button
      className='btn w-100 fw-bold'
      onClick={handleRegister}
      disabled={event.registeredUsers.length >= event.maxParticipants || isRegistering}
      style={{
        backgroundColor: '#f8c035',
        color: 'black',
        fontWeight: 'bold',
        border: 'none'
      }}
    >
      {event.registeredUsers.length >= event.maxParticipants
        ? "Event Full"
        : isRegistering
        ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" />
              Registering...
            </>
          )
        : "Register"}
    </button>
  )}
</div>


<div className='mt-3 text-secondary'>
  {event.maxParticipants - event.registeredUsers.length} spots left
</div>

            </div>

            <div className='mt-5 p-4 bg-white rounded'>
              <div>
                <h4 className='fw-bold'>Instructor</h4>
                <div className='d-flex w-100 align-items-center gap-2'>
                  <img src={`https://i.pravatar.cc/40?img=1`} alt="avatar" className="rounded-circle me-2" width={35} height={35} />
                  <strong>{event.instructorName}</strong>
                </div>
                <p className='mt-3'>
                  {event.instructorBio}
                  </p>
              </div>
            </div>

          </div>
        <div>
        
        </div>
      </div>
    </div>        
          
  )
}

export default EventSingleView