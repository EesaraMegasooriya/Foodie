import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaHeart, FaShareAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

function EventSingleView() {

  const { id } = useParams(); // Get :id from URL
  const [event, setEvent] = useState(null);
  

  useEffect(() => {
    axios.get(`http://localhost:8080/api/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(err => console.error("Error fetching event:", err));
  }, [id]);

  if (!event) return <div className="p-4">Loading event details...</div>;

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
                <h5>Comments (2)</h5>
                <textarea className='w-100 border border-light rounded p-2' rows={3} placeholder='Write a comment...'></textarea>
              </div>

              <div className='d-flex justify-content-end mt-3'>
                <a href=''><button className='btn btn-primary'>Post Comment</button></a>
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