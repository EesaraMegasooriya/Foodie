import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaHeart } from 'react-icons/fa';

function BrowseEvents() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');


  const handleViewDetails = (eventId) => {
    navigate(`/events/${eventId}`);
  };
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <div className='p-5'>
      <div>
      <h2 className='pb-2 text-left fw-bold'>Explore Events</h2>
      
      <p className='text-left w-75 fw-bold'>Filter Events</p>
     
      <div class="d-flex justify-content-between align-items-end gap-3 w-100">

        <div class="flex-grow-1">
          <p class="mb-1">Categories</p>
          <select
            id="category"
            name="category"
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            <option value="workshop">Workshop</option>
            <option value="seminar">Seminar</option>
            <option value="conference">Conference</option>
          </select>

        </div>

        <div class="flex-grow-1">
          <p class="mb-1">Sort By</p>
          <select id="SortBy" name="SortBy" class="form-select">
            <option value="date">Date (Upcoming)</option>
            <option value="seminar">Seminar</option>
            <option value="conference">Conference</option>
          </select>
        </div>

        <div>
          <p class="invisible mb-1">.</p> 
          <button
            className="btn btn-outline-secondary w-100"
            onClick={() => setSelectedCategory('')}
          >
            Reset
          </button>

        </div>

      </div>


      </div>

      {/* <h4 className='mt-5'>Upcoming Events</h4> */}
      <div>

      <Row className="p-4">
      {events
      .filter(event => selectedCategory === '' || event.category.toLowerCase() === selectedCategory.toLowerCase())
      .map((event, idx) => (

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
                <Button
                    variant="outline-primary"
                    onClick={() => handleViewDetails(event.id)}
                  >
                    View Details
                  </Button>
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

export default BrowseEvents