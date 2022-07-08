import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { Suspense } from "react";
import { db } from "../firebase-config";
import { Link } from "react-router-dom";
import calculateTime from "../scripts/calculateTime";
import Loading from "../modules/Loading";
import { Box, Container } from "@mui/system";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import DrillCard from "../modules/DrillCard";
import { Masonry } from "@mui/lab";
import { useQuery } from "react-query";

export default function Home() {
  const { data: recDrills, status } = useQuery("recommendedDrills", () => {
    const q = query(collection(db, "drills"), limit(8));
    return getDocs(q);
  });

  const { data: newsData, status: newsStatus } = useQuery("news", () => {
    return getDocs(
      collection(db, "news"),
      limit(6),
      orderBy("createdAt", "desc")
    );
  });

  if (status === "loading" || newsStatus === "loading") {
    return <Loading />;
  }

  return (
    <Container>
      <Box mb={3}>
        <Typography variant="h4">Nyheter</Typography>
      </Box>
      <Stack spacing={2}>
        {newsData.docs.map((newsItem) => (
          <Paper key={newsItem.id}>
            <Card
              component={Link}
              to={"/news/" + newsItem.id}
              style={{ borderRadius: "12px", textDecoration: "none" }}
            >
              <Paper elevation={4} style={{ borderRadius: "12px" }}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h5" style={{ textDecoration: "none" }}>
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
                    <Typography variant="body1">
                      {calculateTime(newsItem.data().created.seconds)} -{" "}
                      {newsItem.data().uname}
                    </Typography>
                  </CardActions>
                </CardActionArea>
              </Paper>
            </Card>
          </Paper>
        ))}
      </Stack>
      <Box mb={3}>
        <Typography variant="h4">Rekommenderade övningar</Typography>
      </Box>
      <Masonry columns={{ md: 4, sm: 1 }}>
        {recDrills &&
          recDrills.docs.map((drill) => (
            <Suspense fallback={<Loading />}>
              <DrillCard drill={drill} />
            </Suspense>
          ))}
      </Masonry>
    </Container>
  );
}
