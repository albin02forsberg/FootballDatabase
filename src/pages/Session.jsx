import {
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, lazy, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase-config";
import Loading from "../modules/Loading";

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

  if (!session) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="row">
        {session && (
          <div>
            <h1>{session.name}</h1>
            <p>
              {session.difficulty} - {session.type}
            </p>
            <button className="btn btn-primary disabled">
              Exportera till pdf
            </button>

            <hr />
          </div>
        )}
      </div>
      <div className="row">
        <div className="card">
          <div className="card-header">Passets övningar</div>
          <ul>
            {drills &&
              drills.map((drill) => (
                <li key={drill.id}>
                  <Link to={`/drill/${drill.id}`}>
                    {drill.data().name} - {drill.data().difficulty}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        {session && <p>Antal övningar: {session.drills.length}</p>}
        <hr />
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
