import React from 'react'
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaHeart } from 'react-icons/fa';

function BrowseEvents() {
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
        {
          title: 'Creative Watercolor Techniques',
          lable: 'Painting',
          description: 'Experiment with watercolor mediums to create abstract and landscape paintings.',
          date: 'Fri, Feb 16, 2024 at 03.00 PM',
          location: 'Art Lab, 321 Watercolor Way, Portland',
          participants: '14 / 20 participants',
          author: 'Emma Stone',
          likes: 29,
        },
        {
          title: '3D Modeling in Blender',
          lable: 'Workshop',
          description: 'A beginner-friendly workshop teaching the basics of 3D modeling using Blender.',
          date: 'Sat, Mar 2, 2024 at 01.00 PM',
          location: 'Animation Hub, 567 Render Rd, Austin',
          participants: '10 / 15 participants',
          author: 'Lucas Tran',
          likes: 41,
        },
        {
          title: 'Advanced Typography in Graphic Design',
          lable: 'Workshop',
          description: 'Deep dive into typography principles, pairing, and practical design implementation.',
          date: 'Thu, Mar 21, 2024 at 02.00 PM',
          location: 'Design Loft, 901 Font Ave, Chicago',
          participants: '9 / 12 participants',
          author: 'Nina Patel',
          likes: 33,
        },
        {
          title: 'Street Photography Walkthrough',
          lable: 'Photography',
          description: 'Hands-on street photography session capturing candid moments and city life.',
          date: 'Sun, Apr 14, 2024 at 10.00 AM',
          location: 'Downtown District, Los Angeles',
          participants: '16 / 20 participants',
          author: 'Omar Reyes',
          likes: 48,
        },
        {
          title: 'Basics of Acrylic Painting',
          lable: 'Painting',
          description: 'Learn acrylic painting techniques, color mixing, and canvas preparation.',
          date: 'Wed, May 8, 2024 at 04.00 PM',
          location: 'Canvas Studio, 234 Paint St, Miami',
          participants: '7 / 10 participants',
          author: 'Sophia Lin',
          likes: 26,
        },
        {
          title: 'Motion Graphics with After Effects',
          lable: 'Workshop',
          description: 'Get started with Adobe After Effects and learn to animate text, shapes, and scenes.',
          date: 'Sat, May 25, 2024 at 06.00 PM',
          location: 'Visual FX Hall, 876 Motion Ln, Denver',
          participants: '11 / 15 participants',
          author: 'James Carter',
          likes: 39,
        },
        {
          title: 'Digital Portrait Painting',
          lable: 'Painting',
          description: 'Create realistic digital portraits using advanced techniques in Photoshop.',
          date: 'Mon, Jun 3, 2024 at 05.00 PM',
          location: 'Creative Studio, 567 Brush Blvd, Atlanta',
          participants: '13 / 18 participants',
          author: 'Layla Ahmed',
          likes: 44,
        },
      ];

  return (
    <div className='p-2'>
      <div>
      <h2 className='pb-2 text-left fw-bold'>Explore Events</h2>
      
      <p className='text-left w-75 fw-bold'>Filter Events</p>
     
      <div class="d-flex justify-content-between align-items-end gap-3 w-100">

        <div class="flex-grow-1">
          <p class="mb-1">Categories</p>
          <select id="workshop" name="workshop" class="form-select">
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
          <button class="btn btn-outline-secondary w-100">Reset</button>
        </div>

      </div>


      </div>

      {/* <h4 className='mt-5'>Upcoming Events</h4> */}
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
                <Button variant="outline-primary">View Details</Button>
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