import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase-config";

export default function UserHeader({ drills, user, signOut }) {
  const [currentUser, setCurrentUser] = React.useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);

  return (
    <div className="user-header">
      <div className="user-image">
        <img src={user.data().photo} alt={user.data().uname} />
      </div>
      <div className="user-info">
        <h2>{user.data().name}</h2>
      </div>
      <div className="user-info">
        <p>Antal övningar: {drills}</p>
      </div>
      <div className="user-info">
        <p>Gick med {user.data().joined}</p>
      </div>
      <div className="user-info">
        {(currentUser && currentUser.uid === user.id && (
          <>
            <Link to="/profile">
              <button className="btn btn-secondary disabled">
                Redigera profil
              </button>
            </Link>
            <button className="btn btn-danger" onClick={signOut}>
              Logga ut
            </button>
          </>
        )) || <></>}
      </div>
    </div>
  );
}
