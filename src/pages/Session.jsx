import { List, ListItemButton, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import React, { lazy, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase-config";
import Loading from "../modules/Loading";
import { useQuery } from "react-query";

const SessionDrill = lazy(() => {
  return Promise.all([
    import("../modules/SessionDrill"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

export default function Session() {
  const { id } = useParams();

  const { data: sessionData, status } = useQuery(["session", id], () => {
    return getDoc(doc(collection(db, "sessions"), id)).then((s) => {
      return s.data();
    });
  });

  const { data: drillsData, status: drillsStatus } = useQuery(
    ["drills", id],
    () => {
      return getDocs(
        query(
          collection(db, "drills"),
          where("__name__", "in", sessionData.drills)
        )
      );
    },
    {
      enabled: !!sessionData,
    }
  );

  // Get session data and drills from firebase
  // useEffect(() => {
  //   // Get session data from firebase and get drills from firebase with
  //   // the drills imgLink
  //   const sessionCollectionRef = collection(db, "sessions");
  //   const sessionRef = doc(sessionCollectionRef, id);
  //   getDoc(sessionRef).then((doc) => {
  //     document.title = doc.data().name;
  //     setSession(doc.data());
  //     // In order of the array
  //     const drillQ = query(
  //       collection(db, "drills"),
  //       where("__name__", "in", doc.data().drills)
  //     );
  //     getDocs(drillQ).then((docs) => {
  //       setDrills(docs.docs);
  //     });
  //   });
  // }, [id]);

  if (status === "loading" || drillsStatus === "loading") {
    return <Loading />;
  }

  return (
    <Container>
      <Box>
        <Box>
          <Typography variant="h3">{sessionData.name}</Typography>
          {/* <button className="btn btn-primary disabled">
              Exportera till pdf
            </button> */}
        </Box>
      </Box>
      <Box>
        <div className="card">
          <Typography variant="h5">Passets övningar</Typography>
          <List>
            {drillsData &&
              drillsData.docs.map((drill) => (
                <ListItemButton
                  key={drill.id}
                  to={`/drill/${drill.id}`}
                  component={Link}
                >
                  <Typography variant="body1">{drill.data().name}</Typography>
                </ListItemButton>
              ))}
          </List>
        </div>
        <Typography variant="overline">
          Antal övningar: {sessionData.drills.length}
        </Typography>
        <hr />
      </Box>
      <Box>
        {drillsData &&
          drillsData.docs.map((drill) => (
            <Suspense key={drill.id} fallback={<Loading />}>
              <SessionDrill drill={drill} />
            </Suspense>
          ))}
      </Box>
    </Container>
  );
}
