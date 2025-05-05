import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaHeart, FaShareAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

function EventSingleView() {

  const { id } = useParams(); // Get :id from URL
  const [event, setEvent] = useState(null);
  const [comments, setComments] = useState([]);
const [newComment, setNewComment] = useState('');
const [currentUserId, setCurrentUserId] = useState(null);
const [editingCommentId, setEditingCommentId] = useState(null);
const [editingContent, setEditingContent] = useState('');



  

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

  if (!event) return <div className="p-4">Loading event details...</div>;

  const handlePostComment = () => {
    if (!newComment.trim()) return;
  
    const token = localStorage.getItem("jwt_token");
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (!token || !user) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please log in to post a comment',
      });
      return;
    }
  
    axios.post(`http://localhost:8080/api/events/${id}/comments`, {
      content: newComment,
      userId: user.id,
      username: user.username
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setComments([...comments, res.data]);
        setNewComment('');
      })
      .catch(err => {
        console.error("Failed to post comment:", err);
        Swal.fire({
          icon: 'error',
          title: 'Comment Failed',
          text: 'Something went wrong while posting your comment.',
        });
      });
  };
  

  
  const handleDeleteComment = (commentId) => {
    axios.delete(`http://localhost:8080/api/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt_token")}` }
    })
      .then(() => {
        setComments(comments.filter(c => c.id !== commentId));
      })
      .catch(err => console.error("Failed to delete comment:", err));
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  const handleUpdateComment = () => {
    if (!editingContent.trim()) return;
  
    axios.put(`http://localhost:8080/api/comments/${editingCommentId}`, {
      content: editingContent
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt_token")}` }
    })
      .then(res => {
        setComments(comments.map(c => c.id === editingCommentId ? res.data : c));
        setEditingCommentId(null);
        setEditingContent('');
      })
      .catch(err => console.error("Failed to update comment:", err));
  };
  
  

  return (
    
        
    <div  className="mb-4">
      <div className='p-2 d-flex justify-content-between'>
        <div className='p-5 w-75'>
          
              <div className='d-flex align-items-center justify-content-between'>
                <Badge bg="primary" className="mb-2">{event.category}</Badge>
                <div className='d-flex gap-4 '>
                  <div>
                    <FaHeart color="red" className="me-1" /> <span>{event.likes}</span>
                  </div>
                  <div><Button variant="outline-secondary" onClick={handleShare}><FaShareAlt style={{ cursor: 'pointer' }} title="Share this event" /> Share This</Button></div>
                </div>
              </div>
              
              <h2 className='pb-2 mt-3 text-center fw-bold w-100'>{event.title}</h2>

              <div>
                <div className='d-flex py-2 align-items-center'>
                  <FaCalendarAlt color='blue' className="me-2" />
                  <span>{event.eventDate} {event.eventTime}</span>
                </div>
                <div className='d-flex py-2 align-items-center'>
                  <FaMapMarkerAlt color='blue' className="me-2" />
                  <span>{event.location}</span>
                </div>
                <div className='d-flex py-2 align-items-center'>
                  <FaUsers color='blue' className="me-2" />
                  <span>{event.maxParticipants} participants</span>
                </div>
              </div>

              <div className='p-2 mt-4 bg-white rounded'>
                <h5 className='fw-bold'>About this Event</h5>
                <p>{event.description}</p>
              </div>

              <div className='mt-5'>
  <h5>Comments ({comments.length})</h5>

  {/* New Comment Input */}
  <textarea
    className='w-100 border border-light rounded p-2'
    rows={3}
    placeholder='Write a comment...'
    value={newComment}
    onChange={(e) => setNewComment(e.target.value)}
  ></textarea>

  <div className='d-flex justify-content-end mt-3'>
    <button className='btn btn-primary' onClick={handlePostComment}>Post Comment</button>
  </div>

  {/* Existing Comments List */}
  <div className='mt-4'>
    {comments.map(comment => (
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

        {/* If in edit mode */}
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
  </div>
</div>



            
        </div>
          <div className='w-25 mt-5 p-3 d-flex flex-column'>
            <div className='bg-white rounded p-2'>
            <h4 className='fw-bold '>Registration</h4>
            <div className='d-flex justify-content-between fw-semibold mt-3'>
              <p>Registration Fee:</p>
              <p className='text-color-blue' >$ {event.registrationFee}</p>
            </div>
            <div className=''>
              <button className='btn btn-primary w-100'>Register</button>
            </div>
            <div className='mt-3 text-secondary'>
             spots left
            </div>
            </div>

            <div className='mt-5 p-2 bg-white rounded'>
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