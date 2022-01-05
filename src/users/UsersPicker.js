import React, { useEffect, useState } from "react";
// import data from "../static.json";

// const { users } = data;

function UsersPicker(props) {
  /** woeking with useEffect to load users data from api */
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((resp) => resp.json())
      .then((data) => setUsers(data));
  }, []);

  // TODO: introduce spinner component which can be shown while loading the 
  // data, as useEffect run after first render we dont have data from 
  // api initially we show spinner, once data is available we can render component
  // with the data
  
  return (
    <select>
      {users && users.map((u) => <option key={u.id}>{u.name}</option>)}
    </select>
  );
}

export default UsersPicker;
