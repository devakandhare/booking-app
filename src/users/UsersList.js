import React, { Fragment, useEffect, useState } from "react";
import getData from "../utils/api";
// import data from "../static.json";

// const { users } = data;

function UsersList(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [users, setUsers] = useState(null);
  const [userIndex, setUserIndex] = useState(null);

  useEffect(() => {
    // fetching users data from api
    getData("http://localhost:3001/users")
      .then((users) => {
        setUsers(users);
        setUserIndex(0);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const user = users && users.length > 0 && users[userIndex];

  const changeUserIndex = (selectedIndex) => {
    setUserIndex(selectedIndex);
  };

  if (error) {
    return <p>{error.message}</p>;
  }
  if (isLoading) {
    return <p>Users loading...</p>;
  }
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
