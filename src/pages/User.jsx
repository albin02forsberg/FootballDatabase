import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase-config";

import {
  query,
  collection,
  doc,
  where,
  getDocs,
  getDoc,
  orderBy,
} from "firebase/firestore";

export default function User() {
  // get another users data
  const { uid } = useParams();
  const [user, setUser] = React.useState(null);
  const [drills, setDrills] = React.useState(null);
  const [sessions, setSessions] = React.useState(null);


  useEffect(() => {
    const userCollectionRef = collection(db, "users");
    const userRef = doc(userCollectionRef, uid);
    getDoc(userRef)
      .then((u) => {
        setUser(u);
        document.title = u.data().name;
      })
      .catch((error) => {
        console.log(error);
      });
    // getDocs from firsestore where the creator.uid is equal to the uid
    // setDrills to the drills

    const drillQ = query(
      collection(db, "drills"),
      where("uid", "==", uid),
      orderBy("created", "desc")
    );

    getDocs(drillQ).then((docs) => {
      setDrills(docs.docs);
    });

    const sessionQ = query(
      collection(db, "sessions"),
      where("uid", "==", uid),
      orderBy("created", "desc")
    );

    getDocs(sessionQ).then((docs) => {
      setSessions(docs.docs);
    });
  }, [uid]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          {user && (
            <div>
              <h1>{user.data().name}</h1>
              Gick med: {user.data().joined}
              <hr />
            </div>
          )}
        </div>
        <div className="col-md-6">
          <div className="table-responsive">
            {user && <h2>{user.data().name + "s övningar"}</h2>}
            {drills && (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Namn</th>
                    <th scope="col">Typ</th>
                    <th scope="col">Moment</th>
                    <th scope="col">Nivå</th>
                  </tr>
                </thead>
                <tbody>
                  {drills &&
                    // If drills is not null
                    // Loop through drills and create a table row for each drill
                    drills.map((drill) => (
                      <tr key={drill.id}>
                        <td>
                          <Link to={"/drill/" + drill.id}>
                            {drill.data().name}
                          </Link>
                        </td>
                        <td>{drill.data().type}</td>
                        <td>{drill.data().what}</td>
                        <td>{drill.data().difficulty}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="table-responsive">
            {user && <h2>{user.data().name + "s träningspass"}</h2>}
            {sessions && (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Namn</th>
                    <th scope="col">Typ</th>
                    <th scope="col">Nivå</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions &&
                    // If drills is not null
                    // Loop through drills and create a table row for each drill
                    sessions.map((session) => (
                      <tr key={session.id}>
                        <td>
                          <Link to={"/session/" + session.id}>
                            {session.data().name}
                          </Link>
                        </td>
                        <td>{session.data().type}</td>
                        <td>{session.data().difficulty}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
