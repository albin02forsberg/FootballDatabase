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
      <div className="row">
        <h1>Träningspass</h1>

        <Link to="/createSession" className="pageLink">
          <button className="btn btn-primary">Skapa träningspass</button>
        </Link>
        <div className="grid">
          {sessions && // If drills is not null
            // Loop through drills and create a table row for each drill
            sessions.map((session) => (
              <Link to={`/session/${session.id}`} key={session.id}>
                <div className="card mb">
                  <div className="card-header"></div>
                  <div className="card-body">
                    <Link to={`/session/${session.id}`} className="card-text">
                      {session.data().name}
                    </Link>
                    <p className="card-text">{session.data().desc}</p>
                  </div>
                  <hr />
                  <div className="card-footer">
                    <small className="card-text">
                      Antal övningar: {session.data().drills.length}
                    </small>
                    <small className="card-text">{session.data().type}</small>
                    <small className="card-text">
                      Nivå: {session.data().difficulty}
                    </small>
                    <hr />
                    <small className="card-text">
                      {calculateTime(session.data().created.seconds)}
                      <Link to={`/user/${session.data().uid}`}>
                        {session.data().uname}
                      </Link>
                    </small>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
