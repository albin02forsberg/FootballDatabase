import React, { Suspense } from "react";
import { Link } from "next/link";
import calculateTime from "../api/calculateTime";
import Loading from "../components/Loading";
import { Box, Container } from "@mui/system";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import DrillCard from "../components/DrillCard";
import { Masonry } from "@mui/lab";
import { useQuery } from "react-query";
import { getNews, getRecommendedDrills } from "../api/api";

export default function Home() {
  const { data: recDrills, status } = useQuery(
    "recommendedDrills",
    getRecommendedDrills
  );

  const { data: newsData, status: newsStatus } = useQuery("news", () => {
    return getNews();
  });

  if (status === "loading" || newsStatus === "loading") {
    return <Loading />;
  }

  return (
    <>
      <Grid container spacing={3} columns={{ xs: 4, md: 12 }}>
        <Grid item xs>
          <Paper>
            <Box mb={3}>
              <Typography variant="h4">Rekommenderade övningar</Typography>
            </Box>
            <Masonry columns={{ md: 2, sm: 1 }}>
              {recDrills &&
                recDrills.docs.map((drill) => (
                  <Suspense fallback={<Loading />} key={drill.id}>
                    <DrillCard
                      drill={drill.data()}
                      id={drill.id}
                      showCreator={true}
                      key={drill.id}
                    />
                  </Suspense>
                ))}
            </Masonry>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Box mb={3}>
              <Typography variant="h4">Nyheter</Typography>
            </Box>
            <Stack spacing={2}>
              {newsData.docs.map((newsItem) => (
                <Card
                  // component={Link}
                  // href={"/news/" + newsItem.id}
                  style={{
                    borderRadius: "12px",
                    textDecoration: "none",
                    padding: "0",
                  }}
                  key={newsItem.id}
                >
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        variant="h5"
                        style={{ textDecoration: "none" }}
                      >
                        {newsItem.data().title}
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ textDecoration: "none" }}
                      >
                        {newsItem.data().content}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Typography variant="caption">
                        {calculateTime(newsItem.data().created.seconds)} -{" "}
                        {newsItem.data().uname}
                      </Typography>
                    </CardActions>
                  </CardActionArea>
                </Card>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
