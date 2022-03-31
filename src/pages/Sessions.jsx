import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";

export default function Sessions() {
  const [sessions, setSessions] = React.useState(null);

  useEffect(() => {
    const sessionQ = query(
      collection(db, "sessions"),
      orderBy("created", "desc")
    );
    getDocs(sessionQ).then((docs) => {
      setSessions(docs.docs);
    });
  }, []);

  return (
    <div className="container">
      <h1>Träningspass</h1>
      <Link to="/createSession" className="pageLink">
        <button className="btn btn-primary">Skapa träningspass</button>
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Namn</th>
            <th scope="col">Typ</th>
            <th scope="col">Nivå</th>
            <th scope="col">Antal övningar</th>
            <th scope="col">Skapad av</th>
          </tr>
        </thead>
        <tbody>
          {sessions && // If drills is not null
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
                <td>{session.data().drills.length}</td>
                <td>
                  <Link to={"/user/" + session.data().uid}>
                    {" "}
                    {session.data().uname}
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
