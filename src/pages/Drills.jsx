import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
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
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";

const DrillCard = lazy(() => {
  return Promise.all([
    import("../modules/DrillCard"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

export default function Drills() {
  const [drills, setDrills] = React.useState([]);

  const fetchMore = async () => {
    if (drills.length === 0) {
      const drillQ = query(
        collection(db, "drills"),
        orderBy("created", "desc"),
        limit(8)
      );

      const drills = await getDocs(drillQ);
      setDrills(drills.docs);
      return drills.docs;
    } else {
      const drillQ = query(
        collection(db, "drills"),
        orderBy("created", "desc"),
        limit(8),
        // start after the last drill in data
        startAfter(drills[drills.length - 1])
      );
      const dri = await getDocs(drillQ);
      setDrills([...drills, ...dri.docs]);
      console.log(drills.length);
      return dri.docs;
    }
  };
  const { status, fetchNextPage, isFetching } = useInfiniteQuery(
    "drills",
    fetchMore,
    // if inView is true, fetch more data
    {
      getNextPageParam: (lastPage, page) => {
        return page + 1;
      },
      // no need to refetch if the data is already loaded
    }
  );

  const { ref, inView } = useInView();

  useEffect(() => {
    document.title = "Övningar";
  }, []);

  // Use infinite query to fetch more drills when user scrolls to the bottom of the page

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (status === "loading") {
    return <Loading />;
  }

  // if (status === "error") {
  //   return <div>Error</div>;
  // }

  return (
    <Container>
      <Paper
        style={{
          padding: "1rem",
          margin: "1rem",
          backgroundColor: "#fafafa",
          borderRadius: "0.5rem",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box mb={3}>
          <Typography variant="h4">Övningar </Typography>
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
          <Masonry columns={{ md: 4, sm: 1 }} spacing={{ md: 3, sm: 0 }}>
            {drills.map((drill) => (
              <Suspense key={drill.id} fallback={<Loading />}>
                <DrillCard drill={drill} />
              </Suspense>
            ))}
            {isFetching && <Loading />}
          </Masonry>
        </Box>
        <Stack spacing={2}>
          <Divider />
          <Stack spacing={3}>
            {isFetching && (
              <Button
                variant="contained"
                color="primary"
                onClick={fetchNextPage}
                ref={ref}
              >
                Ladda fler
              </Button>
            )}
            {!isFetching && (
              <Button
                variant="contained"
                color="primary"
                onClick={fetchNextPage}
                disabled
                ref={ref}
              >
                Inga fler övningar
              </Button>
            )}
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
