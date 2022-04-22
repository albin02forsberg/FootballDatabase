import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import Loading from "../modules/Loading";
import calculateTime from "../scripts/calculateTime";

export default function Sessions() {
  const [sessions, setSessions] = React.useState(null);

  useEffect(() => {
    document.title = "Träningspass";
    const sessionQ = query(
      collection(db, "sessions"),
      orderBy("created", "desc")
    );
    getDocs(sessionQ).then((docs) => {
      setSessions(docs.docs);
    });
  }, []);

  if (!sessions) {
    return <Loading />;
  }

  return (
    <div className="container">
      <h1>Träningspass</h1>
      <Link to="/createSession" className="pageLink">
        <button className="btn btn-primary">Skapa träningspass</button>
      </Link>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Namn</th>
              <th scope="col">Typ</th>
              <th scope="col">Nivå</th>
              <th scope="col">Antal övningar</th>
              <th scope="col">Skapad av</th>
              <th scope="col">Skapad</th>
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
                  <td>{calculateTime(session.data().created.seconds)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
