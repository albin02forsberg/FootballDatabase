import React, { Suspense } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { db } from "../../firebase-config";
import Loading from "../../components/Loading";
import { useQuery } from "react-query";

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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getUserDrills } from "../../api/api";
import DrillCard from "../../components/DrillCard";
import UserHeader from "../../components/UserHeader";
import Head from "next/head";

export default function User({ signOut }) {
  // get another users data
  const router = useRouter();
  const { uid } = router.query;

  const { data, status } = useQuery(["User", uid], async () => {
    const userCollectionRef = collection(db, "users");
    const userRef = doc(userCollectionRef, uid);
    const u = await getDoc(userRef);
    return u;
  });

  const { data: drillsData, status: drillsStatus } = useQuery(
    ["user drills", uid],
    async (uid) => {
      const drills = await getUserDrills(uid.queryKey[1]);
      return drills;
    }
  );

  const { data: sessionsData } = useQuery(["user sessions", uid], async () => {
    const sessionQ = query(
      collection(db, "sessions"),
      where("uid", "==", uid),
      orderBy("created", "desc")
    );
    const sessions = await getDocs(sessionQ);
    return sessions.docs;
  });

  if (status === "loading" || drillsStatus === "loading") {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>{data.data().name} | Fotbollsträning.se</title>
        <meta
          name="description"
          content={`Här kan du se ${data.data().name}s profil`}
        />
      </Head>
      <Container>
        <Paper
          style={{
            padding: "1rem",
            margin: "0.5rem",
            backgroundColor: "#fafafa",
            borderRadius: "0.5rem",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box mb={3}>
            <Suspense fallback={<Loading />}>
              <UserHeader user={data} signOut={signOut} drills={drillsData} />
            </Suspense>
          </Box>
        </Paper>
        <Paper
          style={{
            padding: "1rem",
            margin: "0.5rem",
            backgroundColor: "#fafafa",
            borderRadius: "0.5rem",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box mb={3}>
            <Typography variant="h4">{data.data().name}s övningar</Typography>
            <Divider style={{ marginBottom: "8pt" }} />

            <Masonry columns={{ md: 4, sm: 1 }} spacing={{ md: 3, sm: 0 }}>
              {drillsData &&
                drillsData.map((drill) => (
                  <Suspense fallback={<Loading />}>
                    <DrillCard drill={drill.data()} id={drill.id} />
                  </Suspense>
                ))}
            </Masonry>
          </Box>
          <Divider />
        </Paper>
        <Paper
          style={{
            padding: "1rem",
            margin: "0.5rem",
            backgroundColor: "#fafafa",
            borderRadius: "0.5rem",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
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
                          <Link href={`/session/${session.id}`}>
                            {session.data().name}
                          </Link>
                        </TableCell>
                        <TableCell>{session.data().type}</TableCell>

                        <TableCell>{session.data().difficulty}</TableCell>
                        <TableCell>{session.data().drills.length}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
