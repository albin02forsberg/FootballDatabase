import React from "react";

export default function UserHeader({ user }) {
  return (
    <div className="user-header">
      <div className="user-image">
        <img src={user.data().photo} alt={user.data().uname} />
      </div>
      <div className="user-info">
        <h2>{user.data().name}</h2>
      </div>
      <div className="user-info">
        <p>Gick med {user.data().joined}</p>
      </div>
    </div>
  );
}
