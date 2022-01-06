// example to understand ref hook
import React, { useState, useRef } from "react";

function Counter(props) {
  const [count, setCount] = useState(1);
  const ref = useRef(1);

  const changeCount = () => {
    setCount((c) => c + 1);
  };

  const changeRefCount = () => ref.current++;

  return (
    <div>
      <button onClick={changeCount}>count: {count}</button>
      <button onClick={changeRefCount}>ref.current: {ref.current}</button>
    </div>
  );
}

export default Counter;
