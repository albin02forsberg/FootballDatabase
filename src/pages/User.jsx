import React, { useEffect, lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase-config";
import Loading from "../modules/Loading";

import {
  query,
  collection,
  doc,
  where,
  getDocs,
  getDoc,
  orderBy,
} from "firebase/firestore";
import { Masonry } from "@mui/lab";
import { Box, Container } from "@mui/system";
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const DrillCard = lazy(() => {
  return Promise.all([
    import("../modules/DrillCard"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const UserHeader = lazy(() => {
  return Promise.all([
    import("../modules/UserHeader"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

export default function User({ signOut }) {
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

  if (!user) {
    return <Loading />;
  }

  return (
    <Container>
      <Box mb={3}>
        {user && drills && (
          <Suspense fallback={<Loading />}>
            <UserHeader user={user} drills={drills.length} signOut={signOut} />
          </Suspense>
        )}
      </Box>
      <Box mb={3}>
        {user && <h2>{user.data().name + "s övningar"}</h2>}
        <Masonry columns={{ md: 4, sm: 1 }} spacing={3}>
          {drills &&
            drills.map((drill) => {
              return (
                <Suspense fallback={<Loading />}>
                  <DrillCard drill={drill} showCreator={false} />
                </Suspense>
              );
            })}
        </Masonry>
      </Box>
      <Divider />
      <Box mb={3}>
        {user && (
          <Typography variant="h5">{user.data().name + "s pass"}</Typography>
        )}
        {sessions && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Namn</TableCell>
                  <TableCell>Typ</TableCell>
                  <TableCell>Nivå</TableCell>
                  <TableCell>Antal övningar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sessions.map((session) => {
                  return (
                    <TableRow key={session.id}>
                      <TableCell>
                        <Link to={`/session/${session.id}`}>
                          {session.data().name}
                        </Link>
                      </TableCell>
                      <TableCell>{session.data().type}</TableCell>
                      <TableCell>{session.data().difficulty}</TableCell>
                      <TableCell>{session.data().drills.length}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
}
