import { collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase-config";

export default function Session() {
  const { id } = useParams();
  const [session, setSession] = React.useState();

  const sessionCollectionRef = collection(db, "sessions");
  const sessionRef = doc(sessionCollectionRef, id);

  useEffect(() => {
    getDoc(sessionRef)
      .then((session) => {
        setSession(session);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className="container">
      {session && (
        <div>
          <h1>{session.data().name}</h1>
          <p>
            {session.data().difficulty} - {session.data().type}
          </p>
        </div>
      )}
      <div className="row">
        <div className="col-md-12">
          <h2>Passets övningar</h2>
          {session &&
            session.data().drills.map((drill) => (
              <div className="card mb-2" key={drill.id}>
                <div className="card-body">
                  <h5 className="card-title">{drill.name}</h5>
                  <p className="card-text">{drill.type}</p>
                </div>
              </div>
            ))}
          {session && <p>Antal övningar: {session.data().drills.length}</p>}
          <hr />
        </div>
      </div>
      {session &&
        session.data().drills.map((drill) => (
          <div className="row">
            <div className="col-md-6">
              <h2>{drill.name}</h2>
              <h3>Vad?</h3>
              <p>{drill.type}</p>
              <h3>Varför?</h3>
              <p>{drill.why}</p>
              <h3>Hur?</h3>
              <p>{drill.how}</p>
              <h3>Organisation</h3>
              <p>{drill.org}</p>
              <h3>Anvisningar</h3>
              <p>{drill.desc}</p>
            </div>
            <div className="col-md-6">
              <img src={drill.imgLink} className="img-thumbnail" />
            </div>
            <hr />
          </div>
        ))}
    </div>
  );
}
