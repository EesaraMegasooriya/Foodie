import React from 'react'
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaHeart } from 'react-icons/fa';

function EventHome() {

  const events = [
    {
      title: 'Introduction to Digital Illustration',
      lable: 'Workshop',
      description: 'Dive into the world of digital illustration using Procreate. Learn to create a stunning digital artwork from concept to completion.',
      date: 'Sat, Nov 18, 2023 at 07.30 PM',
      location: 'Digital Arts Center, 456 Tech Ave, Seattle',
      participants: '12 / 20 participants',
      author: 'Marcus Wong',
      likes: 37,
    },
    {
      title: 'Mastering UI/UX Design',
      lable: 'Painting',
      description: 'Explore essential UI/UX design principles and tools like Figma. Build visually appealing and user-friendly prototypes.',
      date: 'Sun, Dec 10, 2023 at 05.00 PM',
      location: 'Design Hub, 123 Creative Blvd, San Francisco',
      participants: '8 / 15 participants',
      author: 'Alicia Rivera',
      likes: 45,
    },
    {
      title: 'Photography Basics Workshop',
      lable: 'Workshop',
      description: 'Learn the fundamentals of photography including lighting, framing, and editing. Perfect for beginners!',
      date: 'Mon, Jan 8, 2024 at 06.00 PM',
      location: 'Photo Studio, 789 Snap Lane, New York',
      participants: '18 / 20 participants',
      author: 'Daniel Green',
      likes: 52,
    },
  ];

  return (
    <div className='p-2'>
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
                <Badge bg="primary">{event.lable}</Badge>
                <div className="d-flex align-items-center gap-2">
                  <FaHeart color="red" className="me-1" />
                  {event.likes}
                </div>
              </div>

                
                <Card.Title>{event.title}</Card.Title>
                <Card.Text className=''>{event.description}</Card.Text>

                <div className="text-muted small mb-2">
                  <FaCalendarAlt className="me-2" />
                  {event.date}
                </div>
                <div className="text-muted small mb-2">
                  <FaMapMarkerAlt className="me-2" />
                  {event.location}
                </div>
                <div className="text-muted small mb-3">
                  <FaUsers className="me-2" />
                  {event.participants}
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
                  <strong>{event.author}</strong>
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
