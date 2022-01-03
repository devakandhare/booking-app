import { useReducer } from "react";
import reducer from "./weekReducer";
import { getWeek } from "../utils/date-wrangler";
import { FaChevronLeft, FaCalendarDay, FaChevronRight } from "react-icons/fa";

import React from "react";

function WeekPicker({ date }) {
  const [week, dispatch] = useReducer(reducer, date, getWeek);
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