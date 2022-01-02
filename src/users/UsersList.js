import React, { useState } from "react";
import data from "../static.json";

const { users } = data;

function UsersList(props) {
  const [userIndex, setUserIndex] = useState(0);

  const changeUserIndex = (selectedIndex) => {
    setUserIndex(selectedIndex);
  };
  return (
    <ul className="users items-list-nav">
      {users.map((u, i) => (
        <li key={u.id} className={i === userIndex ? "selected" : null}>
          <button className="btn" onClick={() => changeUserIndex(i)}>
            {u.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default UsersList;
