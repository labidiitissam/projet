// EventDetailsPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import EventDetails from '../../components/EventDetails'; // Import the EventDetails component

const EventDetailsPage = ({ events }) => {
  const { eventId } = useParams();
  const event = events.find((e) => e._id === eventId);
   
  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    
      <EventDetails event={event} />
    
  );
};

export default EventDetailsPage;
