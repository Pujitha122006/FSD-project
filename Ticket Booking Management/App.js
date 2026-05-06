import React, { useState } from "react";
import BookingForm from "./components/BookingForm";
import BookingSummary from "./components/BookingSummary";
import "./App.css";

function App() {
  const [bookingData, setBookingData] = useState(null);
  const [available, setAvailable] = useState(50);

  const event = {
    name: "Tech Fest 2026",
    dept: "CSE",
    date: "April 20, 2026",
    time: "10:00 AM",
    venue: "Auditorium",
    price: 150,
    total: 250
  };

  return (
    <div>
      <div className="header">
        <h1>🎟 Ticket Booking App</h1>
      </div>

      <div className="event-card">
        <h2>Event Details</h2>
        <p><b>Event:</b> {event.name}</p>
        <p><b>Dept:</b> {event.dept}</p>
        <p><b>Date:</b> {event.date}</p>
        <p><b>Time:</b> {event.time}</p>
        <p><b>Venue:</b> {event.venue}</p>
        <p><b>Price:</b> ₹{event.price}</p>
        <p><b>Total Tickets:</b> {event.total}</p>
        <p><b>Available:</b> {available}</p>
      </div>

      <BookingForm
        setBookingData={setBookingData}
        available={available}
        setAvailable={setAvailable}
      />

      {bookingData && <BookingSummary data={bookingData} />}
    </div>
  );
}

export default App;