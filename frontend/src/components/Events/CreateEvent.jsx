import React, { useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function CreateEvent() {
  const [eventData, setEventData] = useState({
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
    userId: 1,
  });

  const payload = {
    ...eventData,
    registrationFee: Number(eventData.registrationFee),
    maxParticipants: Number(eventData.maxParticipants),
    type: eventData.type,
    link: eventData.link,
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const {
      title, description, eventDate, eventTime, location, link,
      category, registrationFee, maxParticipants,
      instructorName, instructorBio, type
    } = eventData;

    if (
      !title || !description || !eventDate || !eventTime ||
      !category || !registrationFee || !maxParticipants ||
      !instructorName || !instructorBio || !type
    ) {
      return Swal.fire({ icon: 'warning', title: 'All fields are required!' });
    }

    if (type === 'Online' && (!link || link.trim() === '')) {
      return Swal.fire({ icon: 'warning', title: 'Event link is required for online events.' });
    }

    if (type === 'Physical' && (!location || location.trim() === '')) {
      return Swal.fire({ icon: 'warning', title: 'Event location is required for physical events.' });
    }

    if (title.length > 60) {
      return Swal.fire({ icon: 'error', title: 'Title should be 60 characters or less.' });
    }

    if (description.length < 50) {
      return Swal.fire({ icon: 'error', title: 'Description must be at least 50 characters.' });
    }

    if (instructorBio.length < 30) {
      return Swal.fire({ icon: 'error', title: 'Bio must be at least 30 characters long.' });
    }

    if (isNaN(registrationFee)) {
      return Swal.fire({ icon: 'error', title: 'Registration fee must be a number.' });
    }

    if (isNaN(maxParticipants)) {
      return Swal.fire({ icon: 'error', title: 'Max participants must be a number.' });
    }

    try {
      await axios.post('http://localhost:8080/api/events', payload);
      Swal.fire({
        icon: 'success',
        title: 'Event created successfully!',
        text: 'Redirecting to browse page...',
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => navigate('/events/browse'), 1500);

      setEventData({
        title: '', description: '', eventDate: '', eventTime: '',
        type: '', location: '', link: '', category: '',
        registrationFee: '', maxParticipants: '',
        instructorName: '', instructorBio: '', userId: 2,
      });
    } catch (error) {
      console.error('Error creating event:', error);
      if (error.response?.data) {
        Swal.fire({ icon: 'error', title: 'Oops...', text: `Error: ${JSON.stringify(error.response.data)}` });
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#fff3cd', minHeight: '100vh' }}>
      <div className='px-5 pt-4'>
        <h2 className='pb-2 fw-bold'>Host an Event</h2>
        <p className='w-100 fw-sm'>
          Share your creative skills with the community by hosting an event. Fill out the form below with your event details.
        </p>
      </div>

      <Container className='p-4 bg-white rounded shadow-sm my-4'>
        <h5 className="fw-bold mb-3">Create a New Event</h5>

        {/* Title */}
        <div className='mb-3'>
          <label className='mb-1'>Event Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Enter event title"
            maxLength={60}
            value={eventData.title}
            onChange={handleChange}
          />
          <small className="text-muted">{eventData.title.length}/60 characters</small>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="mb-1">Description</label>
          <textarea
            name="description"
            className={`form-control ${eventData.description.length > 0 && eventData.description.length < 50 ? 'border border-danger' : ''}`}
            placeholder="Enter event description (min 50 characters)"
            value={eventData.description}
            onChange={handleChange}
          />
          <small className={`mt-1 ${eventData.description.length < 50 ? 'text-danger' : 'text-muted'}`}>
            Need more than 50 characters
          </small>
        </div>

        {/* Date & Time */}
        <div className='d-flex gap-3 mb-3'>
          <div className='flex-grow-1'>
            <label className='mb-1'>Event Date</label>
            <input
              type="date"
              name="eventDate"
              className="form-control"
              min={new Date().toISOString().split("T")[0]}
              value={eventData.eventDate}
              onChange={handleChange}
            />
          </div>
          <div className='flex-grow-1'>
            <label className='mb-1'>Event Time</label>
            <input
              type="time"
              name="eventTime"
              className="form-control"
              value={eventData.eventTime}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Type + Location/Link */}
        <div className='d-flex gap-3 mb-3'>
          <div className="flex-grow-1">
            <label className="mb-1">Type</label>
            <select
              name="type"
              className="form-select"
              value={eventData.type || ''}
              onChange={handleChange}
            >
              <option value="" disabled>Select Event Type</option>
              <option value="Physical">Physical</option>
              <option value="Online">Online</option>
            </select>
          </div>

          {eventData.type === "Physical" && (
            <div className='flex-grow-2 w-100'>
              <label className='mb-1'>Event Location</label>
              <input
                type="text"
                name="location"
                className="form-control"
                placeholder="Enter physical address"
                value={eventData.location}
                onChange={handleChange}
              />
            </div>
          )}

          {eventData.type === "Online" && (
            <div className='flex-grow-2 w-100'>
              <label className='mb-1'>Event Link</label>
              <input
                type="url"
                name="link"
                className="form-control"
                placeholder="Paste online meeting link"
                value={eventData.link}
                onChange={handleChange}
              />
            </div>
          )}
        </div>

        {/* Category, Fee, Participants */}
        <div className='d-flex gap-3 mb-3'>
          <div className="flex-grow-1">
            <label className="mb-1">Category</label>
            <select
              name="category"
              className="form-select"
              value={eventData.category}
              onChange={handleChange}
            >
              <option value="" disabled>Select Category</option>
              <option value="Workshop">Workshop</option>
              <option value="Seminar">Seminar</option>
              <option value="Conference">Conference</option>
            </select>
          </div>

          <div className='flex-grow-1'>
            <label className='mb-1'>Registration Fee ($)</label>
            <input
              type="text"
              name="registrationFee"
              className="form-control"
              placeholder="Enter fee"
              value={eventData.registrationFee}
              onChange={(e) => {
                if (/^\d*\.?\d*$/.test(e.target.value)) handleChange(e);
              }}
            />
          </div>

          <div className='flex-grow-1'>
            <label className='mb-1'>Max Participants</label>
            <input
              type="text"
              name="maxParticipants"
              className="form-control"
              placeholder="Enter number"
              value={eventData.maxParticipants}
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) handleChange(e);
              }}
            />
          </div>
        </div>

        {/* Instructor */}
        <div className='mb-3'>
          <label className='mb-1'>
            {eventData.category === "Workshop"
              ? "Facilitator Name"
              : eventData.category === "Seminar"
              ? "Speaker Name"
              : eventData.category === "Conference"
              ? "Keynote Speaker"
              : "Instructor Name"}
          </label>
          <input
            type="text"
            name="instructorName"
            className="form-control"
            placeholder="Enter name"
            value={eventData.instructorName}
            onChange={(e) => {
              const onlyLetters = e.target.value;
              if (/^[A-Za-z.\s]*$/.test(onlyLetters)) handleChange(e);
            }}
          />
        </div>

        <div className="mb-4">
          <label className="mb-1">
            {eventData.category === "Workshop"
              ? "Facilitator Bio"
              : eventData.category === "Seminar"
              ? "Speaker Bio"
              : eventData.category === "Conference"
              ? "Keynote Bio"
              : "Instructor Bio"}
          </label>
          <textarea
            name="instructorBio"
            className="form-control"
            placeholder="Tell participants about instructor"
            rows={3}
            value={eventData.instructorBio}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <div className='d-flex justify-content-end'>
          <button
            className='btn fw-bold text-dark'
            style={{
              backgroundColor: '#f8c035',
              borderColor: '#f8c035',
              padding: '10px 20px'
            }}
            onClick={handleSubmit}
          >
            Create Event
          </button>
        </div>
      </Container>
    </div>
  );
}

export default CreateEvent;
