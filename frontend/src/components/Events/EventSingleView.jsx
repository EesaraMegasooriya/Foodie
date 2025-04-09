import React from 'react'
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaHeart, FaShareAlt } from 'react-icons/fa';

function EventSingleView() {

    const events = [
        {
          title: 'Introduction to Digital Illustration',
          lable: 'Workshop',
          fee: 50,
          description: 'Dive into the world of digital illustration using Procreate. Learn to create a stunning digital artwork from concept to completion.',
          date: 'Sat, Nov 18, 2023 at 07.30 PM',
          location: 'Digital Arts Center, 456 Tech Ave, Seattle',
          participants: '12 / 20',
          author: 'Marcus Wong',
          authorDescription: 'Marcus Wong is a digital artist with over 10 years of experience in the field. He specializes in character design and concept art.',
          likes: 37,
        },
        
      ];

  return (
    <div>
      {events.map((event, idx) => {
        const [registered, total] = event.participants.split(' / ').map(Number);
        const availableSpots = total - registered;

        return (
        
    <div key={idx} className="mb-4">
      <div className='p-2 d-flex justify-content-between'>
        <div className='p-2'>
          
              <div className='d-flex align-items-center justify-content-between'>
                <Badge bg="primary" className="mb-2">{event.lable}</Badge>
                <div className='d-flex gap-4 '>
                  <div>
                    <FaHeart color="red" className="me-1" /> <span>{event.likes}</span>
                  </div>
                  <div><Button variant="outline-secondary"><FaShareAlt style={{ cursor: 'pointer' }} title="Share this event" /> Share This</Button></div>
                </div>
              </div>
              
              <h2 className='pb-2 mt-3 text-center fw-bold w-100'>{event.title}</h2>

              <div>
                <div className='d-flex py-2 align-items-center'>
                  <FaCalendarAlt color='blue' className="me-2" />
                  <span>{event.date}</span>
                </div>
                <div className='d-flex py-2 align-items-center'>
                  <FaMapMarkerAlt color='blue' className="me-2" />
                  <span>{event.location}</span>
                </div>
                <div className='d-flex py-2 align-items-center'>
                  <FaUsers color='blue' className="me-2" />
                  <span>{event.participants} participants</span>
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
          <div className='w-25 mt-5 p-1 d-flex flex-column'>
            <div className='bg-white rounded p-2'>
            <h4 className='fw-bold '>Registration</h4>
            <div className='d-flex justify-content-between fw-semibold mt-3'>
              <p>Registration Fee:</p>
              <p className='text-color-blue' >$ {event.fee}</p>
            </div>
            <div className=''>
              <button className='btn btn-primary w-100'>Register</button>
            </div>
            <div className='mt-3 text-secondary'>
            {availableSpots} spots left
            </div>
            </div>

            <div className='mt-5 p-2 bg-white rounded'>
              <div>
                <h4 className='fw-bold'>Instructor</h4>
                <div className='d-flex w-100 align-items-center gap-2'>
                  <img src={`https://i.pravatar.cc/40?img=${idx + 5}`} alt="avatar" className="rounded-circle me-2" width={35} height={35} />
                  <strong>{event.author}</strong>
                </div>
                <p className='mt-3'>
                  {event.authorDescription}
                  </p>
              </div>
            </div>

          </div>
        <div>
        
        </div>
      </div>
    </div>        
            
        );  

        })}
    </div>
  )
}

export default EventSingleView