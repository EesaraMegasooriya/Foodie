import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';


function CreateEvent() {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    eventDate: '',
    eventTime: '',
    location: '',
    category: 'workshop',
    registrationFee: '',
    maxParticipants: '',
    instructorName: '',
    instructorBio: '',
    userId: 1, // Set dynamically if needed
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/events', eventData);
      Swal.fire({
        icon: 'success',
        title: 'Event Created!',
        text: 'Your event was successfully created.',
        confirmButtonColor: '#3085d6'
      });
      setEventData({
        title: '',
        description: '',
        eventDate: '',
        eventTime: '',
        location: '',
        category: '',
        registrationFee: '',
        maxParticipants: '',
        instructorName: '',
        instructorBio: '',
        likes: '',
        userId: 2,
      });
    } catch (error) {
      console.error('Error creating event:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to create the event. Please try again.',
        confirmButtonColor: '#d33'
      });
    }
  };

  return (
    <div>
      <Container className="p-4 bg-white rounded">
        <h2 className="text-left fw-bold">Host an Event</h2>
        <p className="text-left w-100 fw-sm pb-4">
          Share your creative skills with the community by hosting an event. Fill out the form below.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mt-2 d-flex flex-column">
            <p className="mb-1">Event Title</p>
            <input type="text" name="title" value={eventData.title} onChange={handleChange} className="form-control" placeholder="Enter event title" />
          </div>

          <div className="mt-4 d-flex flex-column">
            <p className="mb-1">Description</p>
            <textarea name="description" value={eventData.description} onChange={handleChange} className="form-control" placeholder="Enter event description" />
          </div>

          <div className="mt-3 d-flex gap-3 w-100">
            <div className="mt-2 flex-grow-1">
              <p className="mb-1">Event Date</p>
              <input type="date" name="eventDate" value={eventData.eventDate} onChange={handleChange} className="form-control" />
            </div>
            <div className="mt-2 flex-grow-1">
              <p className="mb-1">Event Time</p>
              <input type="time" name="eventTime" value={eventData.eventTime} onChange={handleChange} className="form-control" placeholder="Enter event time" />
            </div>
          </div>

          <div className="mt-4 d-flex flex-column">
            <p className="mb-1">Event Location</p>
            <input type="text" name="location" value={eventData.location} onChange={handleChange} className="form-control" placeholder="Enter event location" />
          </div>

          <div className="mt-3 d-flex gap-3 w-100">
            <div className="mt-2 flex-grow-1">
              <p className="mb-1">Category</p>
              <select name="category" value={eventData.category} onChange={handleChange} className="form-select">
                <option value="workshop">Workshop</option>
                <option value="seminar">Seminar</option>
                <option value="conference">Conference</option>
              </select>
            </div>

            <div className="mt-2 flex-grow-1">
              <p className="mb-1">Registration Fee ($)</p>
              <input type="number" name="registrationFee" value={eventData.registrationFee} onChange={handleChange} className="form-control" placeholder="Enter registration fee" />
            </div>

            <div className="mt-2 flex-grow-1">
              <p className="mb-1">Maximum Participants</p>
              <input type="number" name="maxParticipants" value={eventData.maxParticipants} onChange={handleChange} className="form-control" placeholder="Enter maximum participants" />
            </div>
          </div>

          <div className="mt-4 d-flex flex-column">
            <p className="mb-1">Instructor Name</p>
            <input type="text" name="instructorName" value={eventData.instructorName} onChange={handleChange} className="form-control" placeholder="Enter instructor name" />
          </div>

          <div className="mt-4 d-flex flex-column">
            <p className="mb-1">Instructor Bio</p>
            <textarea name="instructorBio" value={eventData.instructorBio} onChange={handleChange} className="form-control" placeholder="Tell participants about the instructor" />
          </div>

          <div className="d-flex justify-content-end mt-3">
            <button type="submit" className="btn btn-primary">Create Event</button>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default CreateEvent;
