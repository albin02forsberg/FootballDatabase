import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { Masonry } from "@mui/lab";
import { Container } from "@mui/system";
import { getDrills } from "../../api/api";
import React, { Suspense, useEffect, lazy } from "react";
import Link from "next/link";
import { auth } from "../../firebase-config";
import Loading from "../../components/Loading";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import DrillCard from "../../components/DrillCard";
import Head from "next/head";


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
  });

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
    <>
      <Head>
        <title>Övningar | Fotbollsträning.se</title>
        <meta name="description" content="Här finns våra övningar" />
      </Head>
      <section class="py-5">
        <div class="container px-5 my-5">
          <div class="row gx-5 justify-content-center">
            <div class="col-lg-6">
              <div class="text-center mb-5">
                <h1 class="fw-bolder">Övningar</h1>
                <p class="lead fw-normal text-muted mb-0"></p>
                {auth.currentUser && (
                  <Link href="/drills/add">
                    <Button variant="contained">Lägg till ny övning</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div class="container px-5 my-5">
          <Masonry
            columns={{ xs: 1, sm: 2, md: 4 }}
            spacing={2}
            style={{ display: "flex", width: "100%", padding: 0, margin: 0 }}
          >
            {data.pages.map((page) => {
              return page.docs.map((doc) => {
                return (
                  <DrillCard
                    drill={doc.data()}
                    id={doc.id}
                    showCreator={true}
                  />
                );
              });
            })}
          </Masonry>
          <div ref={ref}>
            {isFetching && <Loading />}
            {data.pages[data.pages.length - 1].docs.length < 10 && (
              <Typography variant="h6" align="center">
                Inga fler övningar
              </Typography>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
