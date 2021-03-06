import React from "react";
import data from "../static.json";

const { users } = data;

function UsersPicker(props) {
  return (
    <select>
      {users.map((u) => (
        <option key={u.id}>{u.name}</option>
      ))}
    </select>
  );
}

export default UsersPicker;
