import React, { useState } from "react";
import data from "../static.json";

const { bookables } = data;

function BookableList(props) {
  const group = "Rooms";
  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const [bookableIndex, setBookableIndex] = useState(1);

  const changeBookableIndex = (selectedIndex) => {
    setBookableIndex(selectedIndex);
  };

  return (
    <ul className="bookables items-list-nav">
      {bookablesInGroup.map((b, i) => (
        <li key={b.id} className={i === bookableIndex ? "selected" : null}>
          <button className="btn" onClick={() => changeBookableIndex(i)}>
            {b.title}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default BookableList;
