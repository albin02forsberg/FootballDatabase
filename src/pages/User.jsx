import React, { useEffect, lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase-config";
import Loading from "../modules/Loading";
import { useQuery, useQueries } from "react-query";

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

  // useEffect(() => {
  //   const userCollectionRef = collection(db, "users");
  //   const userRef = doc(userCollectionRef, uid);
  //   getDoc(userRef)
  //     .then((u) => {
  //       setUser(u);
  //       document.title = u.data().name;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   // getDocs from firsestore where the creator.uid is equal to the uid
  //   // setDrills to the drills

  //   const drillQ = query(
  //     collection(db, "drills"),
  //     where("uid", "==", uid),
  //     orderBy("created", "desc")
  //   );

  //   getDocs(drillQ).then((docs) => {
  //     setDrills(docs.docs);
  //   });

  //   const sessionQ = query(
  //     collection(db, "sessions"),
  //     where("uid", "==", uid),
  //     orderBy("created", "desc")
  //   );

  //   getDocs(sessionQ).then((docs) => {
  //     setSessions(docs.docs);
  //   });
  // }, [uid]);

  const { data, status } = useQuery(uid, async () => {
    const userCollectionRef = collection(db, "users");
    const userRef = doc(userCollectionRef, uid);
    const u = await getDoc(userRef);
    setUser(u);
    document.title = u.data().name;
    return u;
  });

  const { data: drillsData, status: drillsStatus } = useQuery(
    `${uid}-drills`,
    async () => {
      const drillQ = query(
        collection(db, "drills"),
        where("uid", "==", uid),
        orderBy("created", "desc")
      );
      const drills = await getDocs(drillQ);
      return drills.docs;
    }
  );

  const { data: sessionsData, status: sessionsStatus } = useQuery(
    `${uid}-sessions`,
    async () => {
      const sessionQ = query(
        collection(db, "sessions"),
        where("uid", "==", uid),
        orderBy("created", "desc")
      );
      const sessions = await getDocs(sessionQ);
      return sessions.docs;
    }
  );

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <Container>
      <Box mb={3}>
        {
          <Suspense fallback={<Loading />}>
            <UserHeader user={data} signOut={signOut} />
          </Suspense>
        }
      </Box>
      <Box mb={3}>
        <Typography variant="h4">{data.data().name}s övningar</Typography>
        <Divider style={{ marginBottom: "8pt" }} />

        <Masonry columns={{ md: 4, sm: 1 }} spacing={3}>
          {drillsData &&
            drillsData.map((drill) => (
              <Suspense fallback={<Loading />}>
                <DrillCard drill={drill} />
              </Suspense>
            ))}
        </Masonry>
      </Box>
      <Divider />
      <Box mb={3}>
        <Typography variant="h5">{data.data().name + "s pass"}</Typography>
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
              {sessionsData &&
                sessionsData.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>
                      <Link to={`/session/${session.id}`}>
                        {session.data().name}
                      </Link>
                    </TableCell>
                    <TableCell>{session.data().type}</TableCell>

                    <TableCell>{session.data().level}</TableCell>
                    <TableCell>{session.data().drills.length}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
