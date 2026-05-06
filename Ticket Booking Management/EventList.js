import React from "react";
import "./EventList.css";

const events = [
  {
    id: 1,
    name: "Tech Fest 2026",
    date: "April 20, 2026",
    time: "10:00 AM",
    venue: "Auditorium",
    price: 100
  },
  {
    id: 2,
    name: "AI Workshop",
    date: "May 5, 2026",
    time: "2:00 PM",
    venue: "Lab 1",
    price: 150
  },
  {
    id: 3,
    name: "Hackathon",
    date: "June 10, 2026",
    time: "9:00 AM",
    venue: "Main Hall",
    price: 200
  }
];

function EventList({ setSelectedEvent }) {
  return (
    <div className="event-container">
      <h2>Select Event</h2>

      <div className="event-grid">
        {events.map((event) => (
          <div
            key={event.id}
            className="event-card"
            onClick={() => setSelectedEvent(event)}
          >
            <h3>{event.name}</h3>
            <p>{event.date}</p>
            <p>{event.time}</p>
            <p>{event.venue}</p>
            <p>₹{event.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventList;