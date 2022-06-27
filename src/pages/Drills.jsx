import { Box, Button, Divider, Stack, Typography } from "@mui/material";
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
    <Container>
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
      <Box>
        <Masonry columns={{ md: 4, sm: 1 }} spacing={3}>
          {drills &&
            drills.map((drill) => (
              <Suspense fallback={<Loading />}>
                <DrillCard drill={drill} />
              </Suspense>
            ))}
        </Masonry>
      </Box>
      <Stack spacing={2}>
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
