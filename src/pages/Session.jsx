import {
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase-config";

export default function Session() {
  const { id } = useParams();
  const [session, setSession] = React.useState();
  const [drills, setDrills] = React.useState();

  const sessionCollectionRef = collection(db, "sessions");
  const sessionRef = doc(sessionCollectionRef, id);

  // Get session data and drills from firebase
  useEffect(() => {
    // Get session data from firebase and get drills from firebase with
    // the drills imgLink
    getDoc(sessionRef).then((doc) => {
      document.title = doc.data().name;
      setSession(doc.data());
      const drillQ = query(
        collection(db, "drills"),
        where("__name__", "in", doc.data().drills)
      );
      getDocs(drillQ).then((docs) => {
        setDrills(docs.docs);
      });
    });
  }, [id, sessionRef]);

  return (
    <div className="container">
      {session && (
        <div>
          <h1>{session.name}</h1>
          <p>
            {session.difficulty} - {session.type}
          </p>
        </div>
      )}
      <div className="row">
        <div className="col-md-12">
          <h2>Passets övningar</h2>
          {drills &&
            drills.map((drill) => (
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{drill.data().name}</h5>
                  <p className="card-text">
                    {drill.data().type} - {drill.data().difficulty}
                  </p>
                </div>
              </div>
            ))}
          {session && <p>Antal övningar: {session.drills.length}</p>}
          <hr />
        </div>
      </div>
      {drills &&
        drills.map((drill) => (
          <div className="row">
            <div className="col-md-6">
              <h2>{drill.data().name}</h2>
              <h3>Vad?</h3>
              <p>{drill.data().type}</p>
              <h3>Varför?</h3>
              <p>{drill.data().why}</p>
              <h3>Hur?</h3>
              <p>{drill.data().how}</p>
              <h3>Organisation</h3>
              <p>{drill.data().org}</p>
              <h3>Anvisningar</h3>
              <p>{drill.data().desc}</p>
            </div>
            <div className="col-md-6">
              <img
                src={drill.data().imgLink}
                className="img-thumbnail"
                alt={drill.data().name}
              />
            </div>
            <hr />
          </div>
        ))}
    </div>
  );
}
