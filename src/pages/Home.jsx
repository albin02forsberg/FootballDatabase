import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
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
  Divider,
  Stack,
  Typography,
} from "@mui/material";

export default function Home() {
  const [news, setNews] = React.useState([]);
  const [discussions, setDiscussions] = React.useState([]);

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
    const discussionsQ = query(
      newsRef,
      orderBy("created", "desc"),
      where("isUpdate", "==", false),
      limit(3)
    );
    getDocs(discussionsQ).then((docs) => {
      setDiscussions(docs.docs);
    });
  }, []);

  if (!news.length) {
    <Loading />;
  }

  return (
    <Container>
      <Box mb={3}></Box>
      <Box mb={3}>
        <Typography variant="h4">Nyheter</Typography>
      </Box>
      <Stack spacing={2}>
        {news.map((newsItem) => (
          <Link
            to={`/news/${newsItem.id}`}
            key={newsItem.id}
            style={{ textDecoration: "none" }}
          >
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h5">{newsItem.data().title}</Typography>
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
            </Card>
          </Link>
        ))}
      </Stack>
      <Box mb={10}></Box>
      <Box mb={3}></Box>
    </Container>
  );
}
