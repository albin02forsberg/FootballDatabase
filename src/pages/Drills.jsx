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
  const { ref, inView } = useInView();

  // async function fetchData() {
  //   const drillQ = query(
  //     collection(db, "drills"),
  //     orderBy("created", "desc"),
  //     limit(6)
  //   );

  //   const drills = await getDocs(drillQ);
  //   console.log(drills.docs);
  //   setDrills(drills.docs);
  //   return drills.docs;
  // }

  const fetchMore = async () => {
    const drillQ = query(
      collection(db, "drills"),
      orderBy("created", "desc"),
      limit(12),
      startAfter(drills[drills.length - 1])
    );
    const dri = await getDocs(drillQ);
    setDrills([...drills, ...dri.docs]);
    console.log(drills);
    return dri.docs;
  };

  useEffect(() => {
    document.title = "Övningar";
  }, []);

  // Use infinite query to fetch more drills when user scrolls to the bottom of the page
  const { data, status, fetchNextPage } = useInfiniteQuery(
    "drills",
    async ({ pageParam = 1 }) => {
      const drillQ = query(
        collection(db, "drills"),
        orderBy("created", "desc")
      );

      const drills = await getDocs(drillQ);
      return drills.docs;
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextId,
      refetchOnWindowFocus: false,
      refetchInterval: 1000 * 60,
    }
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "success") {
    console.log(data);
  }

  if (status === "error") {
    return <div>Error</div>;
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
          {
            // For every page in the data, render a drill card
            data.pages.map((page) => {
              return page.map((drill) => {
                return (
                  <Suspense key={drill.id} fallback={<Loading />}>
                    <DrillCard drill={drill} />
                  </Suspense>
                );
              });
            })
          }
        </Masonry>
      </Box>
      <Stack spacing={2}>
        <Divider />
        <Stack spacing={3}>
          <Button onClick={fetchMore} variant="contained" ref={ref} disabled>
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
