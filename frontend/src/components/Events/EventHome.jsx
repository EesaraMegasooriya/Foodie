import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaHeart } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EventHome() {

  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8080/api/events/upcoming')
      .then(res => setEvents(res.data))
      .catch(err => console.error("Error fetching upcoming events:", err));
  }, []);
  

  return (
    <div className='p-5'>
      <h2 className='pb-2 text-center fw-bold'>Share Your Creative Skills</h2>
      <div className='d-flex justify-content-center'>
      <p className='text-center w-75'>Join our creative community to host or attend art workshops and events
          learn new skills teach each others and connect with fellow artists</p>
      </div>

      <div className='d-flex justify-content-center gap-4'>
        <a href='/events/create'><button className='btn btn-primary'>Create Event</button></a>
        <a href='/events/browse'><button className='btn btn-secondary'>Explore Events</button></a>
      </div> 

      <h4 className='mt-5'>Upcoming Events</h4>
      <div>

      <Row className="p-4">
      {events.map((event, idx) => (
        <Col key={idx} md={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column justify-content-between">
              <div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Badge bg="primary">{event.category}</Badge>
                <div className="d-flex align-items-center gap-2">
                  <FaHeart color="red" className="me-1" />
                  {event.likes}
                </div>
              </div>

                
                <Card.Title>{event.title}</Card.Title>
                <Card.Text className=''>{event.description}</Card.Text>

                <div className="text-muted small mb-2">
                  <FaCalendarAlt className="me-2" />
                  {event.eventDate} {event.eventTime}
                </div>
                <div className="text-muted small mb-2">
                  <FaMapMarkerAlt className="me-2" />
                  {event.location}
                </div>
                <div className="text-muted small mb-3">
                  <FaUsers className="me-2" />
                  {event.maxParticipants}
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center">
                  <img
                    src={`https://i.pravatar.cc/40?img=${idx + 5}`}
                    alt="avatar"
                    className="rounded-circle me-2"
                    width={35}
                    height={35}
                  />
                  <strong>{event.instructorName}</strong>
                </div>
                <div className="">
                  <a href='/events/EventSingleView'>
                    <Button variant="outline-primary">View Details</Button>
                  </a>
              </div>
                
              </div>

              
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>

      </div>
      
    
    </div>
  )
}

export default EventHome
