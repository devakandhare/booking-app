import React, { Fragment, useEffect, useState } from "react";
// import data from "../static.json";

// const { users } = data;

function UsersList(props) {
  const [users, setUsers] = useState(null);
  const [userIndex, setUserIndex] = useState(null);

  useEffect(() => {
    // fetching users data from api
    fetch("http://localhost:3001/users")
      .then((resp) => resp.json())
      .then((data) => {
        setUsers(data);
        setUserIndex(0);
      });
  }, []);

  const user = users && users.length > 0 && users[userIndex];

  const changeUserIndex = (selectedIndex) => {
    setUserIndex(selectedIndex);
  };

  return (
    <Fragment>
      <ul className="user-details items-list-nav">
        {users &&
          users.map((u, i) => (
            <li key={u.id} className={i === userIndex ? "selected" : null}>
              <button className="btn" onClick={() => changeUserIndex(i)}>
                {u.name}
              </button>
            </li>
          ))}
      </ul>
      {/** show the details of user. */}
      {user && (
        <div className="user-details">
          <div className="item">
            <div className="item-header">
              <h2>{user.name}</h2>
            </div>
            <p>{user.notes}</p>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default UsersList;
