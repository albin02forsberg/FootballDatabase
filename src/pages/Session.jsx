import { Divider, List, ListItemButton } from "@mui/material";
import { Box, Container } from "@mui/system";
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
      // In order of the array
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
    <Container>
      <Box>
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
      </Box>
      <Box>
        <div className="card">
          <div className="card-header">Passets övningar</div>
          <List>
            {drills &&
              drills.map((drill) => (
                <Link to={`/drill/${drill.id}`} key={drill.id}>
                  <ListItemButton key={drill.id}>
                    {drill.data().name}
                  </ListItemButton>
                </Link>
              ))}
          </List>
        </div>
        {session && <p>Antal övningar: {session.drills.length}</p>}
        <hr />
      </Box>
      {drills &&
        drills.map((drill) => (
          <Suspense fallback={<Loading />}>
            <SessionDrill key={drill.id} drill={drill} session={session} />
            <Divider />
          </Suspense>
        ))}
    </Container>
  );
}
