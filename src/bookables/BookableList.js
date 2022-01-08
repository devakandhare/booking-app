import React, { Fragment, useReducer, useEffect, useRef } from "react";
import data from "../static.json";
import { FaArrowRight } from "react-icons/fa";
import reducer from "./reducer";
import getData from "../utils/api";

const { days, sessions } = data;

/** fetch data for bookables from the api */
const initialState = {
  group: "Kit",
  bookableIndex: 0,
  hasDetails: true,
  bookables: [],
  isLoading: true,
  error: false,
};

function BookableList(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { group, bookableIndex, bookables, hasDetails } = state;
  const { isLoading, error } = state;

  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const groups = [...new Set(bookables.map((b) => b.group))];
  const bookable = bookablesInGroup[bookableIndex];

  // const timerRef = useRef(null);

  useEffect(() => {
    dispatch({ type: "FETCH_BOOKABLES_REQUEST" });
    getData("http://localhost:3001/bookables")
      .then((bookables) => {
        dispatch({ type: "FETCH_BOOKABLES_SUCCESS", payload: bookables });
      })
      .catch((error) => {
        dispatch({
          type: "FETCH_BOOKABLES_ERROR",
          payload: error,
        });
      });
  }, []);

  // useEffect(() => {
  //   timerRef.current = setInterval(() => {
  //     dispatch({ type: "NEXT_BOOKABLES" });
  //   }, 3000);

  //   return stopPresentation;
  // }, []);

  // function stopPresentation() {
  //   clearInterval(timerRef.current);
  // }

  /** TODO: Next requirement is when user select bookables focus on next button and
   * space bar can move to next one */
  // create useRef hook to hold reference of next button
  const nextButtonRef = useRef();

  const changeBookableIndex = (selectedIndex) => {
    dispatch({
      type: "SET_BOOKABLES",
      payload: selectedIndex,
    });
    // add focus when use choose bookables
    nextButtonRef.current.focus();
  };

  const nextBookable = () => {
    dispatch({
      type: "NEXT_BOOKABLES",
    });
  };

  const changeGroup = (e) => {
    // when changing multiple value of managed state it is
    // better to use useReducer hook from react hooks concept
    // it solves the issue of managing multiple value of state
    dispatch({
      type: "SET_GROUP",
      payload: e.target.value,
    });
  };

  const toggleHasDetails = () => {
    dispatch({
      type: "TOGGLE_HAS_DETAILS",
    });
  };

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading bookables...</p>;
  }

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
          <button
            className="btn"
            onClick={nextBookable}
            ref={nextButtonRef}
            autoFocus
          >
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
                <label>
                  <input
                    type="checkbox"
                    checked={hasDetails}
                    onChange={toggleHasDetails}
                  />
                  Show Details
                </label>
                {/** <button className="btn" onClick={stopPresentation}>Stop</button> */}
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
