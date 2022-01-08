import { useReducer, useRef } from "react";
import reducer from "./weekReducer";
import { getWeek } from "../utils/date-wrangler";
import {
  FaChevronLeft,
  FaCalendarDay,
  FaChevronRight,
  FaCalendarCheck,
} from "react-icons/fa";

function WeekPicker({ date }) {
  const [week, dispatch] = useReducer(reducer, date, getWeek);
  const textBoxRef = useRef();

  function goToDate() {
    dispatch({
      type: "SET_DATE",
      payload: textBoxRef.current.value,
    });
  }
  return (
    <div>
      <p className="date-picker">
        <button className="btn" onClick={() => dispatch({ type: "PREV_WEEK" })}>
          <FaChevronLeft />
          <span>Prev</span>
        </button>

        <button className="btn" onClick={() => dispatch({ type: "TODAY" })}>
          <FaCalendarDay />
          <span>Today</span>
        </button>

        {/** add text box and next ref for it */}
        <span>
          <input
            type="text"
            ref={textBoxRef}
            placeholder="e.g. 2020-09-02"
            defaultValue="2022-01-08"
          />
          <button className="go btn" onClick={goToDate}>
            <FaCalendarCheck />
            <span>Go</span>
          </button>
        </span>

        <button className="btn" onClick={() => dispatch({ type: "NEXT_WEEK" })}>
          <FaChevronRight />
          <span>Next</span>
        </button>
      </p>
      <p>
        {week.start.toDateString()} - {week.end.toDateString()}
      </p>
    </div>
  );
}

export default WeekPicker;
