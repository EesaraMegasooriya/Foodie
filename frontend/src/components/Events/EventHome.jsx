import React from 'react';
import { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaClock,FaExternalLinkAlt } from 'react-icons/fa';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function EventHome() {
  const token = localStorage.getItem("jwt");
  if (!token) {
    window.location.href = '/login';
  }
  const decoded = jwtDecode(token);
  console.log(decoded.name); // for example

  const [latestEvents, setLatestEvents] = useState([]);  //Initializes the state as an empty array by useState(), latestEvents holds the list of events
  

  useEffect(() => {
    const fetchEvents = async () => {
      try {
       const token = localStorage.getItem('jwt');
  
       const res = await axios.get('http://localhost:8080/api/events');

      
        const today = new Date(); 

        // Sort events by eventDate ascending and get only the latest 3
        const sorted = res.data
          .filter(e => new Date(e.eventDate) >= today) // only future or today
          .sort((a, b) =>   new Date(a.eventDate) - new Date(b.eventDate))  // ascending: soonest first
          .slice(0, 5);

        setLatestEvents(sorted);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-5" style={{ backgroundColor: '#fff3cd' }}>
      <div className="container my-5">
  <div className="row align-items-center">
    
    {/* Text Left */}
    <div className="col-md-6 p-4">
      <h2 className="pb-2 fw-bold">Share Your Creative Skills</h2>
      <p>
        Join our creative community to host or attend art workshops and events,
        learn new skills, teach each other, and connect with fellow artists.
      </p>
    </div>

    {/* Image Right */}
    <div className="col-md-6 text-center">
      <img
        src="/foodimg.png"
        alt="Delicious Food"
        style={{ width: '80%', maxWidth: '500px', borderRadius: '12px' }}
        className="img-fluid shadow"
      />
    </div>
    
  </div>
</div>


<div className="d-flex justify-content-center gap-4 mt-4">
  <a href="/events/create">
    <button
      className="px-4 py-2 fw-bold rounded"
      style={{
        backgroundColor: '#f8c035',
        color: 'black',
        border: 'none',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e6b830')}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f8c035')}
    >
      Create Event
    </button>
  </a>

  <a href="/events/browse">
    <button
      className="px-4 py-2 fw-bold rounded"
      style={{
        backgroundColor: '#f8c035',
        color: 'black',
        border: 'none',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e6b830')}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f8c035')}
    >
      Explore Events
    </button>
  </a>
</div>


    <h4 className='mt-5'>Upcoming Events</h4>
    <div>

    <Row className="p-4">
      {latestEvents.length > 0 ? (
        latestEvents.map((event, idx) => (
          <Col key={idx} md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Badge bg="" style={{
        backgroundColor: '#f8c035',
        color: 'black',
        
      }}>{event.category}</Badge>
                    
                  </div>

                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>{event.description}</Card.Text>

                  <div className='d-flex gap-5 text-muted small mb-2'>
                                          <div><FaCalendarAlt className="me-1  mb-1" /> {event.eventDate}</div>
                                          <div><FaClock className="me-1"/> {event.eventTime}</div>
                                        </div>
                  

                    <div className='d-flex py-2 align-items-center text-muted small mb-2'>
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
                  
                  <div className="text-muted small mb-3">
                    <FaUsers className="me-2 mb-1" />
                    {event.maxParticipants}
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center">
                    <img
                      src="/ProfilePic.png"
                      alt="avatar"
                      className="rounded-circle me-2"
                      width={35}
                      height={35}
                    />
                    <strong>{event.instructorName}</strong>
                  </div>
                  <div>
                    <a href={`/events/${event.id}`}>
                    <Button
  variant="outline-light"
  style={{
    color: '#f8c035',
    border: '2px solid #f8c035',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.backgroundColor = '#f8c035';
    e.currentTarget.style.color = 'black';
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.backgroundColor = 'transparent';
    e.currentTarget.style.color = '#f8c035';
  }}
>
  View Details
</Button>

                                            </a>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <p className="mt-4 text-muted">No upcoming events found.</p>
      )}
    </Row>

    </div>
    
  
  </div>
  )
}

export default EventHome
