import React, { useState } from "react";
import data from "../static.json";
import { FaArrowRight } from "react-icons/fa";

const { bookables } = data;

function BookableList(props) {
  const [group, setGroup] = useState("Kit");
  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const [bookableIndex, setBookableIndex] = useState(0);

  // get the set of groups
  const groups = [...new Set(bookables.map((b) => b.group))];

  const changeBookableIndex = (selectedIndex) => {
    setBookableIndex(selectedIndex);
  };

  const nextBookable = () => {
    setBookableIndex((i) => (i + 1) % bookablesInGroup.length);
  };

  const changeGroup = (e) => {
    setGroup(e.target.value);
    setBookableIndex(0);
  };

  return (
    <div>
      {/** add options to select the groups from the list */}
      <select value={group} onChange={changeGroup}>
        {groups.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
      <ul className="bookables items-list-nav">
        {bookablesInGroup.map((b, i) => (
          <li key={b.id} className={i === bookableIndex ? "selected" : null}>
            <button className="btn" onClick={() => changeBookableIndex(i)}>
              {b.title}
            </button>
          </li>
        ))}
      </ul>
      <p>
        <button className="btn" onClick={nextBookable} autoFocus>
          <FaArrowRight />
          <span>Next</span>
        </button>
      </p>
    </div>
  );
}

export default BookableList;
