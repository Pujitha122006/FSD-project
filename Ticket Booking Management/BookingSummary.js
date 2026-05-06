import React from "react";
import { jsPDF } from "jspdf";

function BookingSummary({ data }) {

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Ticket Confirmation", 20, 20);
    doc.text(`Name: ${data.name}`, 20, 40);
    doc.text(`Email: ${data.email}`, 20, 50);
    doc.text(`Tickets: ${data.tickets}`, 20, 60);
    doc.text(`Seats: ${data.seats.join(", ")}`, 20, 70);
    doc.save("ticket.pdf");
  };

  return (
    <div className="container">
      <h2>Booking Confirmed</h2>
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
      <p>Tickets: {data.tickets}</p>
      <p>Seats: {data.seats.join(", ")}</p>

      <button onClick={downloadPDF}>Download Ticket</button>
    </div>
  );
}

export default BookingSummary;