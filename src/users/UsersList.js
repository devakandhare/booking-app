import React, { Fragment, useState } from "react";
import data from "../static.json";

const { users } = data;

function UsersList(props) {
  const [userIndex, setUserIndex] = useState(0);
  const user = users[userIndex];

  const changeUserIndex = (selectedIndex) => {
    setUserIndex(selectedIndex);
  };
  return (
    <Fragment>
      <ul className="user-details items-list-nav">
        {users.map((u, i) => (
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
