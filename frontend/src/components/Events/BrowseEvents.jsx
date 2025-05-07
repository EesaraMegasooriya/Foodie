import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaClock, FaExternalLinkAlt } from 'react-icons/fa';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function BrowseEvents() {
  const token = localStorage.getItem("jwt");
  if (!token) window.location.href = '/login';

  const decoded = jwtDecode(token);
  console.log(decoded.name);

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/events');
        setEvents(res.data);
        setFilteredEvents(res.data);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };
    fetchEvents();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    filterAndSort(category, sortBy);
    setVisibleCount(6);
  };

  const handleSortChange = (e) => {
    const sort = e.target.value;
    setSortBy(sort);
    filterAndSort(selectedCategory, sort);
    setVisibleCount(6);
  };

  const handleReset = () => {
    setSelectedCategory('');
    setSortBy('');
    setFilteredEvents(events);
    setVisibleCount(6);
  };

  const filterAndSort = (category, sort) => {
    let updated = [...events];
    if (category) updated = updated.filter(e => e.category.toLowerCase() === category.toLowerCase());
    if (sort === 'date') updated.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
    else if (sort === 'title') updated.sort((a, b) => a.title.localeCompare(b.title));
    setFilteredEvents(updated);
  };

  return (
    <div className="p-5" style={{ backgroundColor: '#fff3cd' }}>
      <h2 className="pb-2 fw-bold">Explore Events</h2>

      <div className="d-flex justify-content-between align-items-end gap-3 w-100 mb-4">
        <div className="flex-grow-1">
          <label className="mb-1 fw-semibold">Category</label>
          <select className="form-select" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">All</option>
            <option value="Workshop">Workshop</option>
            <option value="Seminar">Seminar</option>
            <option value="Conference">Conference</option>
          </select>
        </div>
        <div className="flex-grow-1">
          <label className="mb-1 fw-semibold">Sort By</label>
          <select className="form-select" value={sortBy} onChange={handleSortChange}>
            <option value="">Default</option>
            <option value="date">Date (Upcoming)</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
        <div>
          <p className="invisible mb-1">.</p>
          <button className="btn btn-outline-dark fw-bold" onClick={handleReset}>Reset</button>
        </div>
      </div>

      <Row className="p-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.slice(0, visibleCount).map((event, idx) => (
            <Col key={idx} md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Badge bg="" style={{ backgroundColor: '#f8c035', color: 'black' }} className="mb-2">
                      {event.category}
                    </Badge>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>{event.description}</Card.Text>
                    <div className="text-muted small mb-2">
                      <FaCalendarAlt className="me-2" /> {event.eventDate}
                      <FaClock className="ms-4 me-2" /> {event.eventTime}
                    </div>
                    <div className="text-muted small mb-2">
                      {event.type === 'Online' ? (
                        <>
                          <FaExternalLinkAlt className="me-2" />
                          <a href={event.link} target="_blank" rel="noopener noreferrer">
                            {event.link}
                          </a>
                        </>
                      ) : (
                        <>
                          <FaMapMarkerAlt className="me-2" />
                          {event.location}
                        </>
                      )}
                    </div>
                    <div className="text-muted small mb-3">
                      <FaUsers className="me-2" />
                      {event.maxParticipants}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <img src="/ProfilePic.png" alt="avatar" className="rounded-circle me-2" width={35} height={35} />
                      <strong>{event.instructorName}</strong>
                    </div>
                    <a href={`/events/${event.id}`}>
                      <Button
                        style={{
                          borderColor: '#f8c035',
                          color: '#000',
                          fontWeight: 'bold'
                        }}
                        variant="outline"
                      >
                        View Details
                      </Button>
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-muted">No events found</p>
        )}
      </Row>

      {visibleCount < filteredEvents.length && (
        <div className="d-flex justify-content-center">
          <button
            className="btn fw-bold"
            style={{ backgroundColor: '#f8c035', color: '#000' }}
            onClick={() => setVisibleCount(prev => prev + 6)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default BrowseEvents;
