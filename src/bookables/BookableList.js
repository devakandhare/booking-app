import React, { Fragment, useState } from "react";
import data from "../static.json";
import { FaArrowRight } from "react-icons/fa";

const { bookables, days, sessions } = data;

function BookableList(props) {
  const [group, setGroup] = useState("Kit");
  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const [bookableIndex, setBookableIndex] = useState(0);

  // get the set of groups
  const groups = [...new Set(bookables.map((b) => b.group))];
  const bookable = bookablesInGroup[bookableIndex];
  const [hasDetails, setHasDetails] = useState(false);

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
    <Fragment>
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
      {/** section to show the details of bookable */}
      {bookable && (
        <div className="bookable-details">
          <div className="item">
            <div className="item-header">
              <h2>{bookable.title}</h2>
              <span className="controls">
                <input
                  type="checkbox"
                  checked={hasDetails}
                  onChange={() => setHasDetails((has) => !has)}
                />
                Show Details
              </span>
            </div>
            <p>{bookable.notes}</p>
            {hasDetails && (
              <div className="item-details">
                <h3>Availability</h3>
                <div className="bookable-availability">
                  <ul>
                    {bookable.days.sort().map((d) => (
                      <li key={d}>{days[d]}</li>
                    ))}
                    {bookable.sessions.map((s) => (
                      <li key={s}>{sessions[s]}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default BookableList;
