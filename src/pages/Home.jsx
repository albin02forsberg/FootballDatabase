import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { Suspense, useEffect } from "react";
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

export default function Home() {
  const [news, setNews] = React.useState([]);
  // const [discussions, setDiscussions] = React.useState([]);
  const [drills, setDrills] = React.useState([]);

  useEffect(() => {
    document.title = "Hem";
    const newsRef = collection(db, "news");
    const newsQ = query(
      newsRef,
      orderBy("created", "desc"),
      where("isUpdate", "==", true),
      limit(3)
    );
    getDocs(newsQ).then((docs) => {
      setNews(docs.docs);
    });
    // const discussionsQ = query(
    //   newsRef,
    //   orderBy("created", "desc"),
    //   where("isUpdate", "==", false),
    //   limit(3)
    // );
    // getDocs(discussionsQ).then((docs) => {
    //   // setDiscussions(docs.docs);
    // });

    const drillsRef = collection(db, "drills");
    const drillsQ = query(drillsRef, limit(8));
    getDocs(drillsQ).then((docs) => {
      setDrills(docs.docs);
    });
  }, []);

  if (!news.length) {
    return <Loading />;
  }

  return (
    <Container>
      <Box mb={3}>
        <Typography variant="h4">Nyheter</Typography>
      </Box>
      <Stack spacing={2}>
        {news.map((newsItem) => (
          <Link
            to={`/news/${newsItem.id}`}
            key={newsItem.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Card>
              <Paper elevation={3}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h5">
                      {newsItem.data().title}
                    </Typography>
                    <Typography variant="body1">
                      {newsItem.data().description}
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
          </Link>
        ))}
      </Stack>
      <Box mb={3}>
        <Typography variant="h4">Rekommenderade övningar</Typography>
      </Box>
      <Masonry columns={{ md: 4, sm: 1 }}>
        {drills.map((drill) => (
          <Suspense key={drill.id} fallback={<Loading />}>
            <DrillCard drill={drill} showCreator={true} />
          </Suspense>
        ))}
      </Masonry>
    </Container>
  );
}
