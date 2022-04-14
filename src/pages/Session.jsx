import {
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase-config";
import Loading from "../modules/Loading";

const DrillCard = lazy(() => {
  return Promise.all([
    import("../modules/DrillCard"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const SessionDrill = lazy(() => {
  return Promise.all([
    import("../modules/SessionDrill"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

export default function Session() {
  const { id } = useParams();
  const [session, setSession] = React.useState();
  const [drills, setDrills] = React.useState();


  // Get session data and drills from firebase
  useEffect(() => {
    // Get session data from firebase and get drills from firebase with
    // the drills imgLink
    const sessionCollectionRef = collection(db, "sessions");
    const sessionRef = doc(sessionCollectionRef, id);
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
  }, [id]);

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
          <div className="card">
            <div className="card-header">Passets övningar</div>
            <ul className="list-group list-group-flush">
              {drills &&
                drills.map((drill) => (
                  <Suspense fallback={<Loading />}>
                    <DrillCard drill={drill} />
                  </Suspense>
                ))}
            </ul>
          </div>
          {session && <p>Antal övningar: {session.drills.length}</p>}
          <hr />
        </div>
      </div>
      {drills &&
        drills.map((drill) => (
          <Suspense fallback={<Loading />}>
            <SessionDrill key={drill.id} drill={drill} session={session} />
          </Suspense>
        ))}
    </div>
  );
}
