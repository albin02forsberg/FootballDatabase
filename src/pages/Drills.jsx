import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import { Masonry } from "@mui/lab";
import { Container } from "@mui/system";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import React, { Suspense, useEffect, lazy } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase-config";
import Loading from "../modules/Loading";

const DrillCard = lazy(() => {
  return Promise.all([
    import("../modules/DrillCard"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

export default function Drills() {
  const [drills, setDrills] = React.useState([]);

  useEffect(() => {
    document.title = "Övningar";
    const drillQ = query(
      collection(db, "drills"),
      orderBy("created", "desc"),
      limit(8)
    );
    getDocs(drillQ).then((docs) => {
      setDrills(docs.docs);
    });
  }, []);

  const fetchMore = () => {
    const drillQ = query(
      collection(db, "drills"),
      orderBy("created", "desc"),
      limit(8),
      startAfter(drills[drills.length - 1])
    );
    getDocs(drillQ).then((docs) => {
      setDrills([...drills, ...docs.docs]);
      console.log(drills);
    });
  };

  if (drills.length === 0) {
    return <Loading />;
  }
  return (
    <Container fluid>
      <Box mb={3}></Box>
      <Box mb={3}>
        <Typography variant="h4">Övningar</Typography>
        {auth && auth.currentUser && (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/createdrill"
          >
            Skapa ny övning
          </Button>
        )}
      </Box>
      <Stack spacing={2}>
        <Masonry columns={{ md: 4, sm: 1 }} spacing={3}>
          {drills.map((drill) => (
            <Grid item xs={12} sm={6} md={4} key={drill.id}>
              <Suspense fallback={<Loading />}>
                <DrillCard drill={drill} />
              </Suspense>
            </Grid>
          ))}
        </Masonry>
        <Divider />
        <Stack spacing={3}>
          <Button onClick={fetchMore} variant="contained">
            Ladda fler
          </Button>
        </Stack>
      </Stack>
      <Box mb={10}></Box>
      <Box mb={3}></Box>
      <Box mb={3}></Box>
    </Container>
  );
}
