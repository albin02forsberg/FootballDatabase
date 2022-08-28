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
import { getDrills } from "../api/api";
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
  const { data, status, isFetching, fetchNextPage } = useInfiniteQuery(
    "drills",
    async ({ pageParam = null }) => {
      return getDrills(pageParam);
    },
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.docs[lastPage.docs.length - 1];
      },
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
          margin: "0.5rem",
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
            {data.pages.map((page) => {
              return page.docs.map((doc) => {
                return (
                  <Suspense key={doc.id} fallback={<Loading />}>
                    <DrillCard
                      drill={doc.data()}
                      id={doc.id}
                      showCreator={true}
                    />
                  </Suspense>
                );
              });
            })}

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
