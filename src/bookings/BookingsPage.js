import React from "react";
import WeekPicker from "./WeekPicker";

function BookingsPage(props) {
  return (
    <main className="bookings-page">
      <p>Bookings!</p>
      <WeekPicker date={new Date()} />
    </main>
  );
}

export default BookingsPage;
