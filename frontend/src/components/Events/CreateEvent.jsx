import React from 'react'
import { Container } from 'react-bootstrap'

function CreateEvent() {
  return (
    <div>
      

      <Container className='p-4 bg-white rounded'>
      <div>
        <h2 className=' text-left fw-bold'>Host a Event</h2>
        <p className='text-left w-100 fw-sm pb-4'> share your creative skills with the community by hosting a event fill out the form below with your event details.</p>
      </div>
        <div className='mt-2 d-flex flex-column' >
          <p className='mb-1'>Event Title</p>
          <input type="text" className="form-control" placeholder="Enter event title" />
        </div>

        <div className="mt-4 d-flex flex-column">
          <p className="mb-1">Description</p>
          <textarea type="text" className="form-control" placeholder="Enter event description" />
        </div>

        <div className='mt-3 d-flex gap-3 w-100'>
          <div className='mt-2 flex-grow-1' >
            <p className='mb-1'>Event Date</p>
            <input type="date" className="form-control" placeholder="Enter event date" />
          </div>
          <div className='mt-2 flex-grow-1' >
            <p className='mb-1'>Event Time</p>
            <input type="text" className="form-control" placeholder="Enter event time" />
          </div>
        </div>
        
        <div className='mt-4 d-flex flex-column' >
          <p className='mb-1'>Event Location</p>
          <input type="text" className="form-control" placeholder="Enter event location" />
        </div>

        <div className='mt-3 d-flex  gap-3 w-100'>
          <div class="mt-2 flex-grow-1">
            <p class="mb-1">Categories</p>
            <select id="workshop" name="workshop" class="form-select">
              <option value="workshop">Workshop</option>
              <option value="seminar">Seminar</option>
              <option value="conference">Conference</option>
            </select>
          </div>

          <div className='mt-2 flex-grow-1' >
            <p className='mb-1'>Registration Fee($)</p>
            <input type="number" className="form-control" placeholder="Enter registration fee" />
          </div>

          <div className='mt-2 flex-grow-1' >
            <p className='mb-1'> Maximum Participants</p>
            <input type="number" className="form-control" placeholder="Enter maximum participants" />
          </div>
        </div>

        <div className="mt-4 d-flex flex-column">
          <p className="mb-1">Instructor Bio</p>
          <textarea type="text" className="form-control" placeholder="Tell partcipents about instructor" />
        </div>

        <div className='d-flex justify-content-end mt-3'>
          <a href=''><button className='btn btn-primary'>Create Event</button></a>
        </div>
        

      </Container>
    </div>
  )
}

export default CreateEvent