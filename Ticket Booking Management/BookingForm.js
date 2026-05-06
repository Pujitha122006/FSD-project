import React, { useState } from "react";
import "./BookingForm.css";

function BookingForm({ setBookingData, available, setAvailable }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    tickets: ""
  });

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleSubmit = async () => {

    if (!form.name || !form.email || !form.tickets) {
      alert("Please fill all fields ❌");
      return;
    }

    if (selectedSeats.length !== Number(form.tickets)) {
      alert("Select seats equal to number of tickets ❌");
      return;
    }

    if (form.tickets > available) {
      alert("Not enough tickets ❌");
      return;
    }

    const booking = {
      name: form.name,
      email: form.email,
      tickets: Number(form.tickets),
      seats: selectedSeats
    };

    try {
      const res = await fetch("http://localhost/ticket-api/book.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking)
      });

      const data = await res.json();

      if (data.success) {

        if (data.emailSent) {
          alert("🎉 Booking Successful!\n📧 Email Sent!");
        } else {
          alert("✅ Booking Saved!\n⚠️ Email Failed.");
        }

        setAvailable(available - booking.tickets);
        setBookingData(booking);

        setForm({ name: "", email: "", tickets: "" });
        setSelectedSeats([]);

      } else {
        alert(data.error);
      }

    } catch {
      alert("Server error ❌");
    }
  };

  return (
    <div className="container">
      <h2>Book Ticket</h2>

      <input placeholder="Name"
        value={form.name}
        onChange={(e)=>setForm({...form,name:e.target.value})} />

      <input placeholder="Email"
        value={form.email}
        onChange={(e)=>setForm({...form,email:e.target.value})} />

      <input type="number" placeholder="Tickets"
        value={form.tickets}
        onChange={(e)=>setForm({...form,tickets:e.target.value})} />

      <div className="screen">SCREEN</div>

      <div className="seat-container">
        {[...Array(50)].map((_, i) => {
          const seat = i + 1;
          return (
            <button key={seat}
              className={`seat ${selectedSeats.includes(seat) ? "selected" : ""}`}
              onClick={()=>handleSeatClick(seat)}>
              {seat}
            </button>
          );
        })}
      </div>

      <button className="btn-book" onClick={handleSubmit}>
        Book Ticket
      </button>
    </div>
  );
}

export default BookingForm;